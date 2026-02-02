/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
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
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
  },
})
