/* eslint-disable react/prop-types */
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../theme"

export default function Card({ children, tone }) {
  const { colors, spacing } = useTheme()

  const background =
    tone === "accent"
      ? colors.accentSoft
      : tone === "success"
      ? colors.successSoft
      : tone === "warning"
      ? colors.warningSoft
      : colors.card

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: background,
          padding: spacing.lg,
          borderRadius: spacing.md,
        },
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
})
