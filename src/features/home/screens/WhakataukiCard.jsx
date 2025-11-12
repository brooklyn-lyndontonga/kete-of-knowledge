import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import whakataukiData from "../../../data/whakatauki.json"
import { useTheme } from "../../../theme"

export default function WhakataukiCard() {
  const { colors, spacing, radii, typography } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 86400000
    )

    // ✅ use a different variable name to avoid conflict
    const dailyIndex = dayOfYear % whakataukiData.length
    setCurrentIndex(dailyIndex)
  }, [])

  const { text, translation } = whakataukiData[currentIndex]

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.accent2,
          borderRadius: radii.lg,
          padding: spacing.md,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: typography.body,
          fontSize: 16,
          color: "#fff",
          fontWeight: "600",
          marginBottom: 6,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontFamily: typography.body,
          fontSize: 13,
          color: "#fff",
          fontStyle: "italic",
          opacity: 0.9,
        }}
      >
        {translation}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
})
