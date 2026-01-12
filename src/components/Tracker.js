/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, radius, typography } from "../theme/theme"

export default function Tracker({
  title,
  value,
  description,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {value && (
        <Text style={styles.value}>{value}</Text>
      )}

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
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
