/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { addGoal } from "../../features/goals.db.js"
import { colors, radii, spacing, typography } from "../../theme"

export default function AddGoalScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function save() {
    if (!title) return
    await addGoal({ title, description })
    navigation.goBack()
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
