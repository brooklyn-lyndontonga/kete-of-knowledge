import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"
import { addReminder } from "../../features/reminders.db.js"

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const { isGuest } = useAuth()

  async function save() {
    if (!title.trim() || saving) return

    setSaving(true)
    try {
      await addReminder({
        title: title.trim(),
        schedule: time.trim(),
        notes: notes.trim(),
      })
      navigation.goBack()
    } catch (err) {
      console.error("Failed to save reminder:", err)
      Alert.alert(
        "Couldn't save reminder",
        "Something went wrong saving your reminder. Please try again."
      )
    } finally {
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
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Add Reminder</Text>
      <TextInput
        placeholder="Reminder title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        accessibilityLabel="Reminder title"
      />
      <TextInput
        placeholder="Time (e.g. Morning)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
        accessibilityLabel="Reminder time"
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.inputMultiline]}
        multiline
        accessibilityLabel="Reminder notes"
      />
      <Pressable
        onPress={save}
        disabled={!title.trim() || saving}
        accessibilityRole="button"
        accessibilityLabel="Save reminder"
        style={({ pressed }) => [
          styles.primaryButton,
          (pressed || saving || !title.trim()) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>
          {saving ? "Saving…" : "Save Reminder"}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
