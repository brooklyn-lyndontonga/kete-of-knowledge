import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useState } from "react"

import { CONTACT_CATEGORIES, addContact } from "../../features/contacts.db.js"
import { colors, layout, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function AddContactScreen({ navigation }) {
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("whanau")
  const [isEmergency, setIsEmergency] = useState(false)
  const [saving, setSaving] = useState(false)
  const { isGuest } = useAuth()

  async function save() {
    if (!name.trim() || saving) return
    setSaving(true)
    try {
      await addContact({
        name: name.trim(),
        relationship,
        phone,
        email,
        category,
        isEmergency,
      })
      navigation.goBack()
    } catch (err) {
      console.warn("Could not save contact:", err?.message)
      setSaving(false)
    }
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to add contacts"
        subtitle="Takiuru kia tāpiri whakapā"
        description="Create an account to save your whānau and provider contacts."
      />
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Contact</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        accessibilityLabel="Contact name"
      />

      <TextInput
        placeholder="Relationship (e.g. daughter, GP)"
        value={relationship}
        onChangeText={setRelationship}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Email (optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {CONTACT_CATEGORIES.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() => setCategory(key)}
            style={[styles.chip, category === key && styles.chipActive]}
            accessibilityRole="radio"
            accessibilityState={{ selected: category === key }}
          >
            <Text
              style={[
                styles.chipText,
                category === key && styles.chipTextActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setIsEmergency((v) => !v)}
        style={[styles.toggle, isEmergency && styles.toggleActive]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isEmergency }}
      >
        <Text style={[styles.chipText, isEmergency && styles.chipTextActive]}>
          {isEmergency ? "✓ " : ""}Show in emergency quick-dial
        </Text>
      </Pressable>

      <Pressable
        onPress={save}
        disabled={!name.trim() || saving}
        style={({ pressed }) => [
          styles.primaryButton,
          (!name.trim() || saving || pressed) && styles.buttonPressed,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>
          {saving ? "Saving…" : "Save Contact"}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: {
    padding: layout.screenPadding,
    gap: spacing.sm,
    paddingBottom: 40,
  },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  label: { ...typography.caption, color: colors.muted, marginTop: spacing.sm },
  input: {
    color: colors.text, // explicit: OEM force-dark made typed text invisible

    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 48,
  },
  row: { flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  chipActive: { backgroundColor: colors.olive },
  chipText: { ...typography.bodyStrong, color: colors.russet },
  chipTextActive: { color: colors.cornsilk },
  toggle: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    minHeight: 48,
    justifyContent: "center",
  },
  toggleActive: { backgroundColor: colors.olive },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: { opacity: 0.7 },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
})
