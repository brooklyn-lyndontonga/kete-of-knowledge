/* eslint-disable react/prop-types */
// src/ui/components/WhakataukiCard.jsx
import React from "react"
import { View, Text } from "react-native"
import { useTheme } from "../../app/providers/ThemeProvider"


export default function WhakataukiCard({ quote, translation }) {
  const { colors, spacing, typography } = useTheme()

  if (!quote) return null

  return (
    <View
      style={{
        backgroundColor: colors.beige,
        padding: spacing.lg,
        borderRadius: 16,
        marginBottom: spacing.lg,
      }}
    >
      <Text
        style={{
          fontFamily: typography.medium,
          fontSize: 16,
          color: colors.charcoal,
        }}
      >
        {quote}
      </Text>

      {translation && (
        <Text
          style={{
            marginTop: spacing.sm,
            fontFamily: typography.body,
            fontSize: 13,
            color: colors.mutedText,
          }}
        >
          {translation}
        </Text>
      )}
    </View>
  )
}
