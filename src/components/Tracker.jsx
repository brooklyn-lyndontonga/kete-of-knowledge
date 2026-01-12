/* eslint-disable react/prop-types */
import React from "react"
import { Text, StyleSheet } from "react-native"
import Card from "./Card"
import { colors, spacing, typography } from "../theme/theme"

export default function Tracker({
  title,
  value,
  description,
  status, // "success" | "warning"
}) {
  return (
    <Card tone={status}>
      <Text style={styles.title}>{title}</Text>

      {value && (
        <Text style={styles.value}>{value}</Text>
      )}

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.h2,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: typography.h1,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.small,
    color: colors.muted,
    lineHeight: 20,
  },
})
