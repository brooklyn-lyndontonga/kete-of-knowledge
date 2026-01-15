/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"
import { useTheme } from "../../app/providers/ThemeProvider"

export default function WhakataukiCard({ quote }) {
  console.log("🌟 WhakataukiCard rendered")

  const { colors, spacing, typography } = useTheme()

  // Fallback placeholder (IMPORTANT: still renders UI)
  if (!quote) {
    return (
      <View
        style={{
          backgroundColor: colors.card,
          padding: spacing.lg,
          borderRadius: spacing.md,
          marginTop: spacing.lg,
        }}
      >
        <Text
          style={{
            fontFamily: typography.body,
            fontSize: 14,
            color: colors.mutedText,
            fontStyle: "italic",
          }}
        >
          He whakataukī mō tēnei rā ka tae mai ākuanei 🌱
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: spacing.lg,
        borderRadius: spacing.md,
        marginTop: spacing.lg,
      }}
    >
      <Text
        style={{
          fontFamily: typography.heading,
          fontSize: 18,
          color: colors.primary,
          fontStyle: "italic",
          marginBottom: spacing.sm,
        }}
      >
        “{quote.text}”
      </Text>

      {quote.translation && (
        <Text
          style={{
            fontFamily: typography.body,
            fontSize: 14,
            color: colors.mutedText,
          }}
        >
          {quote.translation}
        </Text>
      )}

      {quote.attribution && (
        <Text
          style={{
            marginTop: spacing.sm,
            fontSize: 12,
            color: colors.mutedText,
            textAlign: "right",
          }}
        >
          — {quote.attribution}
        </Text>
      )}
    </View>
  )
}
