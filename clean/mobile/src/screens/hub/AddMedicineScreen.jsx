 
 

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { addMedicine } from "../../features/medicines.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddMedicineScreen({ navigation }) {
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")
  const { isGuest } = useAuth()

  async function save() {
    if (!name) return

    await addMedicine({
      name,
      notes,
    })

    navigation.goBack()
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to log medicines"
        subtitle="Takiuru kia tuhi rongoā"
        description="Create an account to save your medicines and rongoā."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medicine</Text>
      <TextInput
        placeholder="Rongoā / Medicine name"
        value={name}
        onChangeText={setName}
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
        <Text style={styles.primaryText}>Save</Text>
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
