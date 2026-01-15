 
import React from "react"
import { Text } from "react-native"
import Card from "../../../components/Card"
import { useTheme } from "../../../theme"
import { useReflectionTile } from "../../../hooks/useReflectionTile"

export default function ReflectionTileCard() {
  const tile = useReflectionTile()
  const { typography, spacing, colors } = useTheme()

  if (!tile) return null

  return (
    <Card>
      <Text
        style={{
          fontFamily: typography.h2,
          color: colors.ink,
          marginBottom: spacing.sm,
        }}
      >
        {tile.title}
      </Text>

      {tile.caption && (
        <Text style={{ opacity: 0.7 }}>{tile.caption}</Text>
      )}
    </Card>
  )
}
