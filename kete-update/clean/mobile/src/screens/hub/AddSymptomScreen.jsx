import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"

import { addSymptom } from "../../features/symptoms.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddSymptomScreen({ navigation }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")
  const [notes, setNotes] = useState("")
  const { isGuest } = useAuth()

  async function save() {
    if (!symptom) return
    await addSymptom({
      symptom,
      severity: Number(severity) || null,
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
      <Text style={styles.title}>Log a Symptom</Text>
      <TextInput
        placeholder="Symptom"
        value={symptom}
        onChangeText={setSymptom}
        style={styles.input}
      />

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
