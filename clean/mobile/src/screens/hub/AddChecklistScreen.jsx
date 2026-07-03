import { View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"
import { addChecklist } from "../../features/checklists.db.js"

export default function AddChecklistScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [item, setItem] = useState("")
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const { isGuest } = useAuth()

  function addItem() {
    if (!item.trim()) return
    setItems([...items, { label: item.trim(), done: false }])
    setItem("")
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  async function save() {
    if (!title.trim() || saving) return

    setSaving(true)
    try {
      await addChecklist({ title: title.trim(), items })
      navigation.goBack()
    } catch (err) {
      console.error("Failed to save checklist:", err)
      Alert.alert(
        "Couldn't save checklist",
        "Something went wrong saving your checklist. Please try again."
      )
    } finally {
      setSaving(false)
    }
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to create checklists"
        subtitle="Takiuru kia hanga rārangi"
        description="Create an account to save your checklists."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">New Checklist</Text>
      <TextInput
        placeholder="Checklist title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        accessibilityLabel="Checklist title"
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Add item"
          value={item}
          onChangeText={setItem}
          onSubmitEditing={addItem}
          returnKeyType="done"
          style={[styles.input, styles.rowInput]}
          accessibilityLabel="New checklist item"
        />
        <Pressable
          onPress={addItem}
          accessibilityRole="button"
          accessibilityLabel="Add item to checklist"
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Add</Text>
        </Pressable>
      </View>

      {items.map((i, idx) => (
        <Pressable
          key={idx}
          onPress={() => removeItem(idx)}
          accessibilityRole="button"
          accessibilityLabel={`Remove item ${i.label}`}
        >
          <Text style={styles.listItem}>• {i.label}  ✕</Text>
        </Pressable>
      ))}

      <Pressable
        onPress={save}
        disabled={!title.trim() || saving}
        accessibilityRole="button"
        accessibilityLabel="Save checklist"
        style={({ pressed }) => [
          styles.primaryButton,
          (pressed || saving || !title.trim()) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>
          {saving ? "Saving…" : "Save Checklist"}
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
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  input: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  rowInput: {
    flex: 1,
  },
  listItem: {
    ...typography.body,
    color: colors.text,
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
