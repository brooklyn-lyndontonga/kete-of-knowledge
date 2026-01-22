/* eslint-disable react/prop-types */
// src/ui/components/ProfileCard.jsx
import React from "react"
import { View, Text } from "react-native"
import { useTheme } from "../../app/providers/ThemeProvider"


export default function ProfileCard({ title, subtitle }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: spacing.lg,
        borderRadius: 16,
        marginBottom: spacing.md,
      }}
    >
      <Text
        style={{
          fontFamily: typography.medium,
          fontSize: 16,
          color: colors.text,
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            marginTop: spacing.xs,
            fontFamily: typography.body,
            fontSize: 13,
            color: colors.mutedText,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  )
}
