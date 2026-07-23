import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"

import { addSymptom } from "../../features/symptoms.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useLanguage } from "../../i18n/LanguageContext"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

const SYMPTOM_TAGS = [
  { key: "rest", labelKey: "symptoms.tag.rest" },
  { key: "activity", labelKey: "symptoms.tag.activity" },
  { key: "morning", labelKey: "symptoms.tag.morning" },
  { key: "night", labelKey: "symptoms.tag.night" },
  { key: "stress", labelKey: "symptoms.tag.stress" },
  { key: "after-meds", labelKey: "symptoms.tag.afterMeds" },
]

export default function AddSymptomScreen({ navigation }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")
  const [tags, setTags] = useState([])
  const [notes, setNotes] = useState("")
  const { isGuest } = useAuth()
  const { t } = useLanguage()

  async function save() {
    if (!symptom) return
    await addSymptom({
      symptom,
      severity: Number(severity) || null,
      tags: tags.join(","),
      notes,
    })
    navigation.goBack()
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to log symptoms"
        subtitle="Takiuru kia tuhi tohu"
        description="Create an account to keep track of your symptoms."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {t("symptoms.add")}
      </Text>
      <TextInput
        placeholder="Symptom"
        value={symptom}
        onChangeText={setSymptom}
        style={styles.input}
        accessibilityLabel="Symptom"
      />

      <Text style={styles.label}>{t("symptoms.tags")}</Text>
      <View style={styles.chipRow}>
        {SYMPTOM_TAGS.map((tag) => {
          const selected = tags.includes(tag.key)
          return (
            <Pressable
              key={tag.key}
              onPress={() =>
                setTags((current) =>
                  selected
                    ? current.filter((k) => k !== tag.key)
                    : [...current, tag.key]
                )
              }
              style={[styles.chip, selected && styles.chipActive]}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={t(tag.labelKey)}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextActive]}
              >
                {t(tag.labelKey)}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <TextInput
        placeholder="Severity (1–10)"
        value={severity}
        onChangeText={setSeverity}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.inputMultiline]}
        multiline
      />

      <Pressable
        onPress={save}
        style={styles.primaryButton}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>Save Symptom</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
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
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.cornsilk,
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  input: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  inputMultiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  primaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
