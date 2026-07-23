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
import { buildDataExportString } from "../features/exportData"
import { wipeLocalData } from "../db"
import { colors, layout, radii, shadow, spacing, typography } from "../theme"

// Replace with the client's hosted policy URLs before store submission.
const PRIVACY_POLICY_URL = "https://thecentreforhealth.co.nz/kete-privacy"
const TERMS_URL = "https://thecentreforhealth.co.nz/kete-terms"
const SUPPORT_EMAIL = "support@thecentreforhealth.co.nz"

function Row({ label, reo, description, onPress, tone = "default" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.rowLabel, tone === "danger" && styles.dangerText]}>
        {label}
      </Text>
      {reo ? <Text style={styles.rowReo}>{reo}</Text> : null}
      {description ? (
        <Text style={styles.rowDescription}>{description}</Text>
      ) : null}
    </Pressable>
  )
}

export default function SettingsScreen() {
  const { isAuthenticated, isGuest, login, logout, session } = useAuth()
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

  function confirmDelete() {
    Alert.alert(
      "Delete my data",
      "This permanently removes everything saved on this device — your profile, goals, symptoms, medicines, notes, reminders, checklists and contacts. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete everything",
          style: "destructive",
          onPress: async () => {
            try {
              await wipeLocalData()
              Alert.alert("Deleted", "Your data has been removed from this device.")
            } catch (err) {
              Alert.alert("Couldn't delete", "Please try again.")
              console.warn("Wipe failed:", err?.message)
            }
          },
        },
      ]
    )
  }

  function open(url) {
    Linking.openURL(url).catch(() =>
      Alert.alert("Couldn't open link", "Please check your connection.")
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Tautuhinga</Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Account</Text>
        {session?.user?.email ? (
          <Text style={styles.accountEmail}>{session.user.email}</Text>
        ) : (
          <Text style={styles.accountEmail}>
            {isGuest ? "Browsing as guest" : "Not signed in"}
          </Text>
        )}
        <Row
          label={isAuthenticated ? "Sign out" : "Sign in"}
          reo={isAuthenticated ? "Takiputa" : "Takiuru"}
          onPress={isAuthenticated ? logout : login}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>My data</Text>
        <Row
          label={busy ? "Preparing…" : "Export my data"}
          reo="Tuku i aku raraunga"
          description="Save a copy of everything stored on this device."
          onPress={exportData}
        />
        <Row
          label="Delete my data"
          reo="Muku i aku raraunga"
          description="Permanently remove everything saved on this device."
          onPress={confirmDelete}
          tone="danger"
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Privacy & help</Text>
        <Row
          label="Privacy policy"
          reo="Kaupapa here matatapu"
          onPress={() => open(PRIVACY_POLICY_URL)}
        />
        <Row
          label="Terms of use"
          reo="Ngā ture whakamahi"
          onPress={() => open(TERMS_URL)}
        />
        <Row
          label="Get help"
          reo="Tono āwhina"
          description={SUPPORT_EMAIL}
          onPress={() => open(`mailto:${SUPPORT_EMAIL}`)}
        />
      </View>

      <Text style={styles.footnote}>
        Your health information is stored on this device only. It is not
        uploaded to our servers.
      </Text>
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
  subtitle: { ...typography.caption, color: colors.muted },
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
  accountEmail: {
    ...typography.caption,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  row: {
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    minHeight: 48,
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
  rowLabel: { ...typography.bodyStrong, color: colors.olive },
  rowReo: { ...typography.caption, color: colors.muted },
  rowDescription: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  dangerText: { color: colors.orange },
  footnote: {
    ...typography.caption,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 19,
  },
})
