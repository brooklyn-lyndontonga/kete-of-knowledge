/* eslint-disable react/prop-types */
// src/ui/components/GoalInput.jsx
import React from "react"
import { View, TextInput } from "react-native"
import { useTheme } from "../../app/providers/ThemeProvider"


export default function GoalInput({ value, onChangeText, placeholder }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginBottom: spacing.md,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        style={{
          fontFamily: typography.body,
          fontSize: 14,
          color: colors.text,
        }}
      />
    </View>
  )
}
