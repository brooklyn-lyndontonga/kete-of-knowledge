import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import whakataukiData from "../../../data/whakatauki.json"
import { useTheme } from "../../../theme"

export default function WhakataukiCard() {
  const { colors, spacing, radii, typography } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
    setCurrentIndex(dayOfYear % whakataukiData.length)
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
      <Text style={{ fontFamily: typography.body, fontSize: 16, color: "white", fontWeight: "600" }}>
        {text}
      </Text>
      <Text style={{ fontFamily: typography.body, fontSize: 13, color: "white", opacity: 0.9, marginTop: 4 }}>
        {translation}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { marginTop: 10 },
})
