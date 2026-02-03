/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"

import { addNote } from "../../features/notes.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { isGuest } = useAuth()

  async function save() {
    if (!content) return

    await addNote({
      title,
      content,
    })

    navigation.goBack()
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to add notes"
        subtitle="Takiuru kia tuhi kōrero"
        description="Create an account to save your notes."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Note</Text>
      <TextInput
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Write your note"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.inputMultiline]}
      />
      <Pressable onPress={save} style={styles.primaryButton}>
        <Text style={styles.primaryText}>Save Note</Text>
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
    minHeight: 120,
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
