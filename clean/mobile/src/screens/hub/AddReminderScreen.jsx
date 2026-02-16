 
 
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const { isGuest } = useAuth()

  function save() {
    if (!title) return
    // later → SQLite insert
    navigation.goBack()
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
      <Text style={styles.title}>Add Reminder</Text>
      <TextInput
        placeholder="Reminder title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (e.g. Morning)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.inputMultiline]}
        multiline
      />
      <Pressable onPress={save} style={styles.primaryButton}>
        <Text style={styles.primaryText}>Save Reminder</Text>
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
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
