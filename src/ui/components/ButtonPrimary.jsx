/* eslint-disable react/prop-types */
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { useTheme } from "../../theme"

export default function ButtonPrimary({ title, onPress }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: spacing.md,
        alignItems: "center",
        marginTop: spacing.lg,
      }}
    >
      <Text
        style={{
          fontFamily: typography.bold,
          color: "#fff",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
