/* eslint-disable react/prop-types */
// src/ui/components/ButtonPrimary.jsx
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { useTheme } from "../../app/providers/ThemeProvider"


export default function ButtonPrimary({ label, onPress }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: typography.medium,
          fontSize: 15,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
