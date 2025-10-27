import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { useTheme } from "../../theme"
import whakataukiData from "../../data/whakatauki.json"

export default function WhakataukiCard() {
  const { colors, spacing, typography } = useTheme()
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    // Rotate daily (change each day)
    const today = new Date().getDate()
    const index = today % whakataukiData.length
    setQuote(whakataukiData[index])
  }, [])

  if (!quote) return null

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: spacing.lg,
        borderRadius: spacing.md,
        marginTop: spacing.lg,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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

      <Text
        style={{
          fontFamily: typography.body,
          fontSize: 14,
          color: colors.mutedText,
        }}
      >
        {quote.translation}
      </Text>
    </View>
  )
}
