import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useState } from "react"

import { addReminder } from "../../features/reminders.db"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

const PRESETS = [
  { label: "Morning", value: "08:00" },
  { label: "Midday", value: "12:00" },
  { label: "Evening", value: "18:00" },
  { label: "Night", value: "21:00" },
]

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const { isGuest } = useAuth()

  async function save() {
    if (!title.trim() || saving) return

    if (time && !TIME_PATTERN.test(time)) {
      setError("Please enter the time as HH:MM, for example 08:30.")
      return
    }

    setSaving(true)
    setError("")
    try {
      await addReminder({
        title: title.trim(),
        schedule: "daily",
        timeOfDay: time,
        notes,
      })
      navigation.goBack()
    } catch (err) {
      console.warn("Could not save reminder:", err?.message)
      setError("Something went wrong saving this reminder.")
      setSaving(false)
    }
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to add reminders"
        subtitle="Takiuru kia mahara tonu"
        description="Create an account to manage reminders."
      />
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Reminder</Text>

      <TextInput
        placeholder="Reminder title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        accessibilityLabel="Reminder title"
      />

      <Text style={styles.label}>When each day</Text>
      <View style={styles.row}>
        {PRESETS.map((preset) => (
          <Pressable
            key={preset.value}
            onPress={() => setTime(preset.value)}
            style={[styles.chip, time === preset.value && styles.chipActive]}
            accessibilityRole="radio"
            accessibilityState={{ selected: time === preset.value }}
          >
            <Text
              style={[
                styles.chipText,
                time === preset.value && styles.chipTextActive,
              ]}
            >
              {preset.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Or type a time (HH:MM)"
        value={time}
        onChangeText={(value) => {
          setTime(value)
          setError("")
        }}
        style={styles.input}
        accessibilityLabel="Reminder time in 24 hour format"
      />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.inputMultiline]}
        multiline
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        onPress={save}
        disabled={!title.trim() || saving}
        style={({ pressed }) => [
          styles.primaryButton,
          (!title.trim() || saving || pressed) && styles.buttonPressed,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>
          {saving ? "Saving…" : "Save Reminder"}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  container: { padding: 20, gap: spacing.sm, paddingBottom: 40 },
  title: { ...typography.title, color: colors.text },
  label: { ...typography.caption, color: colors.muted, marginTop: spacing.sm },
  row: { flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" },
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
  input: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 48,
  },
  inputMultiline: { minHeight: 100, textAlignVertical: "top" },
  error: { ...typography.caption, color: colors.orange },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: { opacity: 0.7 },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
})
