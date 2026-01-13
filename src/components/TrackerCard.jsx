/* eslint-disable react/prop-types */
import React from "react"
import { Text, StyleSheet } from "react-native"

import Card from "./Card"
import { useTheme } from "../theme"

export default function TrackerCard({
  title,
  value,
  status = "neutral",
}) {
  const { colors, spacing, typography } = useTheme()
  const styles = createStyles(colors, spacing, typography)

  return (
    <Card tone={status}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value ?? "—"}</Text>
    </Card>
  )
}

function createStyles(colors, spacing, typography) {
  return StyleSheet.create({
    title: {
      fontFamily: typography.body,
      fontSize: typography.small,
      color: colors.muted,
      marginBottom: spacing.xs,
    },
    value: {
      fontFamily: typography.heading,
      fontSize: typography.h2,
      color: colors.text,
    },
  })
}
