 
 

import { Modal, View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function ProfileNotesModal({
  visible,
  onClose,
  onSave,
  initialValue = "",
}) {
  const [text, setText] = useState("")

  useEffect(() => {
    setText(initialValue)
  }, [initialValue, visible])

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={styles.overlay}
      >
        <View
          style={styles.modal}
        >
          <Text style={styles.title}>Profile Notes</Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write something about yourself, your health, or anything important…"
            multiline
            style={styles.input}
          />

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onSave(text)
                onClose()
              }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(33, 31, 24, 0.35)",
    justifyContent: "center",
    padding: spacing.lg,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    textAlignVertical: "top",
    backgroundColor: colors.card,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "flex-end",
  },
  secondaryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.meringue,
  },
  secondaryText: {
    ...typography.bodyStrong,
    color: colors.olive,
  },
  primaryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.olive,
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
