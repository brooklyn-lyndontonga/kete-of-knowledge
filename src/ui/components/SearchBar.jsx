/* eslint-disable react/prop-types */
import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { useTheme } from "../../theme"

export default function SearchBar({ query, setQuery, placeholder = "Search..." }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, marginBottom: spacing.md },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            fontFamily: typography.body,
            backgroundColor: colors.card,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        value={query}
        onChangeText={setQuery}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: {
    height: 42,
    fontSize: 16,
  },
})
