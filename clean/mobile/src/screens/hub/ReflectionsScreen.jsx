import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { fetchReflectionPrompts } from "../../api/contentApi"
import {
  addReflection,
  deleteReflection,
  getReflections,
} from "../../features/reflections.db.js"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"
import { useLanguage } from "../../i18n/LanguageContext"
import { colors, layout, radii, shadow, spacing, typography } from "../../theme"

/**
 * Rotates the prompt by day so the same one isn't shown every time,
 * without needing any server-side scheduling.
 */
function promptOfTheDay(prompts) {
  if (!prompts.length) return null
  const dayIndex = Math.floor(Date.now() / 86400000)
  return prompts[dayIndex % prompts.length]
}

export default function ReflectionsScreen() {
  const [prompts, setPrompts] = useState([])
  const [entries, setEntries] = useState([])
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const { isGuest } = useAuth()
  const guard = useAuthGuard()
  const { t } = useLanguage()

  useEffect(() => {
    fetchReflectionPrompts()
      .then((data) => setPrompts(Array.isArray(data) ? data : []))
      .catch(() => setPrompts([]))
      .finally(() => setLoading(false))
  }, [])

  const load = useCallback(() => {
    getReflections()
      .then((rows) => setEntries(rows || []))
      .catch((err) => console.warn("Could not load reflections:", err?.message))
  }, [])

  useFocusEffect(
    useCallback(() => {
      load()
    }, [load])
  )

  const today = promptOfTheDay(prompts)

  async function save() {
    if (!response.trim() || saving) return
    setSaving(true)
    try {
      await addReflection({
        prompt: today?.prompt || "",
        promptId: today?.id ?? null,
        response: response.trim(),
      })
      setResponse("")
      load()
    } catch (err) {
      console.warn("Could not save reflection:", err?.message)
    } finally {
      setSaving(false)
    }
  }

  function confirmDelete(entry) {
    Alert.alert(t("action.delete"), entry.response.slice(0, 60), [
      { text: t("action.cancel"), style: "cancel" },
      {
        text: t("action.delete"),
        style: "destructive",
        onPress: () => deleteReflection(entry.id).then(load),
      },
    ])
  }

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {t("reflections.title")}
        </Text>
      </View>

      {today ? (
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>{t("reflections.todayPrompt")}</Text>
          {today.title ? (
            <Text style={styles.promptTitle}>{today.title}</Text>
          ) : null}
          <Text style={styles.promptText}>{today.prompt}</Text>

          <TextInput
            placeholder={t("reflections.placeholder")}
            value={response}
            onChangeText={setResponse}
            style={styles.input}
            multiline
            accessibilityLabel={today.prompt}
          />

          <Pressable
            onPress={() => guard(save)}
            disabled={!response.trim() || saving}
            style={({ pressed }) => [
              styles.primaryButton,
              (!response.trim() || saving || pressed || isGuest) &&
                styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={t("reflections.save")}
          >
            <Text style={styles.primaryText}>
              {saving ? t("action.saving") : t("reflections.save")}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {entries.length === 0 ? (
        <Text style={styles.empty}>{t("reflections.empty")}</Text>
      ) : (
        entries.map((entry) => (
          <View key={entry.id} style={styles.card}>
            {entry.prompt ? (
              <Text style={styles.cardPrompt}>{entry.prompt}</Text>
            ) : null}
            <Text style={styles.cardBody}>{entry.response}</Text>
            <Text style={styles.cardDate}>
              {String(entry.logged_at).slice(0, 10)}
            </Text>
            <Pressable
              onPress={() => guard(() => confirmDelete(entry))}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={t("action.delete")}
            >
              <Text style={styles.deleteText}>{t("action.delete")}</Text>
            </Pressable>
          </View>
        ))
      )}
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
  promptCard: {
    backgroundColor: colors.meringue,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  promptLabel: { ...typography.caption, color: colors.russet },
  promptTitle: { ...typography.bodyStrong, color: colors.text },
  promptText: { ...typography.body, color: colors.text },
  input: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 110,
    textAlignVertical: "top",
    marginTop: spacing.sm,
  },
  primaryButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  cardPrompt: { ...typography.caption, color: colors.muted },
  cardBody: { ...typography.body, color: colors.text },
  cardDate: { ...typography.caption, color: colors.muted },
  deleteButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  deleteText: { ...typography.bodyStrong, color: colors.russet },
  empty: { ...typography.body, color: colors.muted, textAlign: "center" },
})
