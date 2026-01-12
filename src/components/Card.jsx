/* eslint-disable react/prop-types */
import React from "react"
import { View, StyleSheet } from "react-native"
import { colors, spacing, radius } from "../theme/theme"

/**
 * Card
 *
 * Visual rules:
 * - Default: neutral
 * - tone="success"  → moss border
 * - tone="warning"  → seed-pod border
 * - tone="accent"   → fern shadow border
 *
 * NO filled colours.
 * Colour = meaning only.
 */
export default function Card({
  children,
  tone,        // "success" | "warning" | "accent"
  soft = false,
  style,
}) {
  return (
    <View
      style={[
        styles.card,
        soft && styles.soft,
        tone && styles[tone],
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },

  soft: {
    backgroundColor: colors.surface,
  },

  // 🌿 Meaningful tones
  success: {
    borderColor: colors.success,
  },

  warning: {
    borderColor: colors.warning,
  },

  accent: {
    borderColor: colors.accent,
  },
})
