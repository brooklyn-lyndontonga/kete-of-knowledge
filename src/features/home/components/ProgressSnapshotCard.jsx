/* eslint-disable react/prop-types */
import React from "react"
import { Text } from "react-native"
import Card from "../../../components/Card"
import { useTheme } from "../../../theme"

export default function ProgressSnapshotCard({ snapshot }) {
  const { typography, spacing, colors } = useTheme()

  if (!snapshot) return null

  return (
    <Card tone="accent">
      <Text
        style={{
          fontFamily: typography.h2,
          color: colors.ink,
          marginBottom: spacing.sm,
        }}
      >
        Today’s Check-in
      </Text>

      <Text>Mood: {snapshot.mood ?? "—"}</Text>
      <Text>Energy: {snapshot.energy ?? "—"}</Text>
      <Text>Notes: {snapshot.notes || "—"}</Text>
    </Card>
  )
}
