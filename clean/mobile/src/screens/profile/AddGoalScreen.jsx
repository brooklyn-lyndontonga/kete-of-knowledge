import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native"
import { useEffect, useState } from "react"
import { addGoal } from "../../features/goals.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"
import { useLanguage } from "../../i18n/LanguageContext"
import { fetchProfileSeeds } from "../../api/contentApi"
import { fetchWhakatauki } from "../../api/appApi"

export default function AddGoalScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [seeds, setSeeds] = useState([])
  const [whakatauki, setWhakatauki] = useState(null)
  const { isGuest } = useAuth()
  const { t } = useLanguage()

  useEffect(() => {
    // Preset goal options come from the CMS "Profile Seeds" section.
    fetchProfileSeeds()
      .then((rows) =>
        setSeeds(
          (Array.isArray(rows) ? rows : []).filter(
            (r) => (r.name || "").toLowerCase() === "goal"
          )
        )
      )
      .catch(() => setSeeds([]))

    // A whakataukī to sit alongside goal-setting, as scoped.
    fetchWhakatauki()
      .then((rows) => {
        const list = Array.isArray(rows) ? rows : []
        if (!list.length) return
        setWhakatauki(list[Math.floor(Math.random() * list.length)])
      })
      .catch(() => setWhakatauki(null))
  }, [])

  async function save() {
    if (!title) return
    await addGoal({ title, description })
    navigation.goBack()
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to add goals"
        subtitle="Takiuru kia tāpiri whāinga"
        description="Create an account to save your goals."
      />
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Add Goal
      </Text>

      {whakatauki ? (
        <View style={styles.whakataukiCard}>
          <Text style={styles.whakataukiLabel}>{t("goals.whakatauki")}</Text>
          <Text style={styles.whakataukiText}>{whakatauki.text}</Text>
          {whakatauki.translation ? (
            <Text style={styles.whakataukiTranslation}>
              {whakatauki.translation}
            </Text>
          ) : null}
        </View>
      ) : null}
      <TextInput
        placeholder="Goal title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {seeds.length > 0 ? (
        <>
          <Text style={styles.label}>{t("goals.suggestions")}</Text>
          <View style={styles.chipRow}>
            {seeds.map((seed) => (
              <Pressable
                key={seed.id}
                onPress={() => setTitle(seed.value)}
                style={[styles.chip, title === seed.value && styles.chipActive]}
                accessibilityRole="button"
                accessibilityLabel={seed.value}
              >
                <Text
                  style={[
                    styles.chipText,
                    title === seed.value && styles.chipTextActive,
                  ]}
                >
                  {seed.value}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      <TextInput
        placeholder="Notes (optional)"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.inputMultiline]}
        multiline
      />

      <Pressable
        onPress={save}
        style={styles.primaryButton}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>Save Goal</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  label: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.sm,
  },
  whakataukiCard: {
    backgroundColor: colors.meringue,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  whakataukiLabel: { ...typography.caption, color: colors.russet },
  whakataukiText: { ...typography.bodyStrong, color: colors.text },
  whakataukiTranslation: { ...typography.caption, color: colors.muted },
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
    color: colors.text, // explicit: OEM force-dark made typed text invisible

    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  inputMultiline: {
    color: colors.text, // explicit: OEM force-dark made typed text invisible

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
