/* eslint-disable react/prop-types */
import React from "react"
import { View, StyleSheet } from "react-native"
import { colors, spacing, radius } from "../theme/theme"

export default function Card({ children, soft = false, style }) {
  return (
    <View
      style={[
        styles.card,
        soft && styles.soft,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  soft: {
    backgroundColor: colors.surface,
  },
})

