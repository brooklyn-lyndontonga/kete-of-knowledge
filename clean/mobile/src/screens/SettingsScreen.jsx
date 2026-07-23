import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useState } from "react"

import { useAuth } from "../auth/AuthContext"
import { useLanguage } from "../i18n/LanguageContext"
import { useSync } from "../sync/SyncContext"
import { buildDataExportString } from "../features/exportData"
import { wipeLocalData } from "../db"
import { colors, layout, radii, shadow, spacing, typography } from "../theme"
import { REQUIRED_BEFORE_RELEASE } from "../config"

function relativeTime(iso, t) {
  if (!iso) return t("sync.never")
  const diff = Date.now() - Date.parse(iso)
  if (Number.isNaN(diff)) return t("sync.never")

  const mins = Math.floor(diff / 60000)
  if (mins < 1) return t("sync.lastSynced", { when: "just now" })
  if (mins < 60) return t("sync.lastSynced", { when: `${mins}m ago` })

  const hours = Math.floor(mins / 60)
  if (hours < 24) return t("sync.lastSynced", { when: `${hours}h ago` })

  const days = Math.floor(hours / 24)
  return t("sync.lastSynced", { when: `${days}d ago` })
}

function Row({ label, description, onPress, tone = "default", disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        (pressed || disabled) && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled) }}
    >
      <Text style={[styles.rowLabel, tone === "danger" && styles.dangerText]}>
        {label}
      </Text>
      {description ? (
        <Text style={styles.rowDescription}>{description}</Text>
      ) : null}
    </Pressable>
  )
}

const { privacyPolicyUrl, termsUrl, supportEmail } = REQUIRED_BEFORE_RELEASE

export default function SettingsScreen() {
  const { isAuthenticated, isGuest, login, logout, session } = useAuth()
  const { t, language, setLanguage, languages } = useLanguage()
  const sync = useSync()
  const [busy, setBusy] = useState(false)

  async function exportData() {
    if (busy) return
    setBusy(true)
    try {
      const payload = await buildDataExportString()
      await Share.share({
        title: "My Kete of Knowledge data",
        message: payload,
      })
    } catch (err) {
      Alert.alert("Export failed", "Couldn't prepare your data just now.")
      console.warn("Export failed:", err?.message)
    } finally {
      setBusy(false)
    }
  }

  async function runDelete({ remote }) {
    try {
      if (remote) {
        const result = await sync.deleteRemote()
        if (!result.ok) {
          Alert.alert(
            "Couldn't reach the server",
            "Your device data was not deleted. Try again when you're back online."
          )
          return
        }
      }
      await wipeLocalData()
      await sync.refreshMeta()
      Alert.alert("Deleted", "Your data has been removed.")
    } catch (err) {
      Alert.alert("Couldn't delete", "Please try again.")
      console.warn("Wipe failed:", err?.message)
    }
  }

  function confirmDelete() {
    const buttons = [
      { text: t("action.cancel"), style: "cancel" },
      { text: "This device only", onPress: () => runDelete({ remote: false }) },
    ]

    if (isAuthenticated) {
      buttons.push({
        text: "Device and account",
        style: "destructive",
        onPress: () => runDelete({ remote: true }),
      })
    }

    Alert.alert(
      t("settings.delete"),
      "This permanently removes your profile, goals, symptoms, medicines, notes, reminders, checklists and contacts. This cannot be undone.",
      buttons
    )
  }

  async function runSync() {
    const result = await sync.sync({ force: true })
    if (!result.ok && result.reason === "offline") {
      Alert.alert("Offline", t("sync.offline"))
    }
  }

  function open(url) {
    Linking.openURL(url).catch(() =>
      Alert.alert("Couldn't open link", "Please check your connection.")
    )
  }

  const syncLine =
    sync.status === "syncing"
      ? t("sync.syncing")
      : sync.status === "offline"
        ? t("sync.offline")
        : sync.status === "error"
          ? t("sync.error")
          : relativeTime(sync.lastSyncedAt, t)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {t("settings.title")}
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle} accessibilityRole="header">
          {t("settings.language")}
        </Text>
        <View style={styles.chipRow}>
          {languages.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              style={[styles.chip, language === lang.code && styles.chipActive]}
              accessibilityRole="radio"
              accessibilityState={{ selected: language === lang.code }}
              accessibilityLabel={lang.nativeLabel}
            >
              <Text
                style={[
                  styles.chipText,
                  language === lang.code && styles.chipTextActive,
                ]}
              >
                {lang.nativeLabel}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle} accessibilityRole="header">
          {t("settings.account")}
        </Text>
        <Text style={styles.accountEmail}>
          {session?.user?.email ||
            (isGuest ? t("settings.guest") : t("settings.notSignedIn"))}
        </Text>
        <Row
          label={isAuthenticated ? t("action.signOut") : t("action.signIn")}
          onPress={isAuthenticated ? logout : login}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle} accessibilityRole="header">
          {t("sync.group")}
        </Text>
        <Text style={styles.accountEmail}>
          {isAuthenticated ? t("sync.synced") : t("sync.localOnly")}
        </Text>

        {isAuthenticated ? (
          <>
            <Text style={styles.syncStatus}>{syncLine}</Text>
            {sync.pending > 0 ? (
              <Text style={styles.syncPending}>
                {t("sync.pending", { count: sync.pending })}
              </Text>
            ) : null}
            <Row
              label={
                sync.status === "syncing" ? t("sync.syncing") : t("sync.now")
              }
              onPress={runSync}
              disabled={sync.status === "syncing"}
            />
          </>
        ) : (
          <Text style={styles.rowDescription}>{t("sync.signInPrompt")}</Text>
        )}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle} accessibilityRole="header">
          {t("settings.myData")}
        </Text>
        <Row
          label={busy ? t("action.saving") : t("settings.export")}
          description={t("settings.exportBlurb")}
          onPress={exportData}
          disabled={busy}
        />
        <Row
          label={t("settings.delete")}
          description={t("settings.deleteBlurb")}
          onPress={confirmDelete}
          tone="danger"
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle} accessibilityRole="header">
          {t("settings.privacyGroup")}
        </Text>
        <Row
          label={t("settings.privacy")}
          onPress={() => open(privacyPolicyUrl)}
        />
        <Row label={t("settings.terms")} onPress={() => open(termsUrl)} />
        <Row
          label={t("settings.help")}
          description={supportEmail}
          onPress={() => open(`mailto:${supportEmail}`)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: {
    padding: layout.screenPadding,
    gap: spacing.md,
    paddingBottom: 40,
  },
  header: { gap: spacing.xs },
  title: { ...typography.display, color: colors.olive },
  group: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  groupTitle: { ...typography.title, color: colors.text },
  accountEmail: { ...typography.caption, color: colors.muted },
  syncStatus: { ...typography.caption, color: colors.muted },
  syncPending: { ...typography.caption, color: colors.camel },
  chipRow: { flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  chipActive: { backgroundColor: colors.olive },
  chipText: { ...typography.bodyStrong, color: colors.russet },
  chipTextActive: { color: colors.cornsilk },
  row: {
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    minHeight: 48,
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
  rowLabel: { ...typography.bodyStrong, color: colors.olive },
  rowDescription: { ...typography.caption, color: colors.muted, marginTop: 2 },
  dangerText: { color: colors.orange },
})
