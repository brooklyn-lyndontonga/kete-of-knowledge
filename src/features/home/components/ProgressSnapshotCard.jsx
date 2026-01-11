/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"
import { useTheme } from "../../../theme"

export default function ProgressSnapshotCard({ snapshot }) {
  const { colors, spacing, typography } = useTheme()

  if (!snapshot) return null

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
          fontSize: 16,
          color: colors.primary,
          marginBottom: spacing.sm,
        }}
      >
        Today’s Check-in
      </Text>

      <Text style={{ fontSize: 14, marginBottom: spacing.xs }}>
        Mood: {snapshot.mood ?? "—"}
      </Text>

      <Text style={{ fontSize: 14, marginBottom: spacing.xs }}>
        Energy: {snapshot.energy ?? "—"}
      </Text>

      <Text style={{ fontSize: 14 }}>
        Notes: {snapshot.notes || "—"}
      </Text>
    </View>
  )
}
