import { View, TextInput, Pressable, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { addChecklist } from "../../features/checklists.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddChecklistScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [item, setItem] = useState("")
  const [items, setItems] = useState([])
  const { isGuest } = useAuth()

  function addItem() {
    if (!item) return
    setItems([...items, { label: item, done: false }])
    setItem("")
  }

  const [saving, setSaving] = useState(false)

  async function save() {
    if (!title.trim() || saving) return
    setSaving(true)
    try {
      await addChecklist({ title: title.trim(), items })
      navigation.goBack()
    } catch (err) {
      console.warn("Could not save checklist:", err?.message)
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
      <Text style={styles.title}>New Checklist</Text>
      <TextInput
        placeholder="Checklist title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Add item"
          value={item}
          onChangeText={setItem}
          style={[styles.input, styles.rowInput]}
        />

        <Pressable
          onPress={addItem}
          style={styles.secondaryButton}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryText}>Add</Text>
        </Pressable>
      </View>

      {items.map((i, idx) => (
        <Text key={idx} style={styles.listItem}>
          • {i.label}
        </Text>
      ))}

      <Pressable
        onPress={save}
        style={styles.primaryButton}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>Save Checklist</Text>
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
    color: colors.text, // explicit: OEM force-dark made typed text invisible

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
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
