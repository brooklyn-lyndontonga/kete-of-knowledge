/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"

import { addSymptom } from "../../features/symptoms.db.js"
import { colors, radii, spacing, typography } from "../../theme"

export default function AddSymptomScreen({ navigation }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")
  const [notes, setNotes] = useState("")

  async function save() {
    if (!symptom) return
    await addSymptom({
      symptom,
      severity: Number(severity) || null,
      notes,
    })
    navigation.goBack()
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
      <Pressable onPress={save} style={styles.primaryButton}>
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
