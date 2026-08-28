import { TextInput, StyleSheet } from "react-native"
import { colors, radii, spacing, typography } from "../../theme"

export default function SearchBar({ value, onChange }) {
  return (
    <TextInput
      placeholder="Search resources"
      value={value}
      onChangeText={onChange}
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    color: colors.text, // explicit: OEM force-dark made typed text invisible

    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
  },
})
