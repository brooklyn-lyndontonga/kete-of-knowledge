 
 

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { addGoal } from "../../features/goals.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddGoalScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { isGuest } = useAuth()

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
    <View style={styles.container}>
      <Text style={styles.title}>Add Goal</Text>
      <TextInput
        placeholder="Goal title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Notes (optional)"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.inputMultiline]}
        multiline
      />

      <Pressable onPress={save} style={styles.primaryButton}>
        <Text style={styles.primaryText}>Save Goal</Text>
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
