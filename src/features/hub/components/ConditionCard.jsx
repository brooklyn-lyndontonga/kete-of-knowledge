/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import { Pressable, Text, View } from "react-native"
import { useTheme } from "../../../theme"

export default function ConditionCard({ condition, onPress }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        padding: spacing.md,
        borderRadius: spacing.md,
        marginBottom: spacing.md,
      }}
    >
      <Text
        style={{
          fontFamily: typography.heading,
          fontSize: 16,
          color: colors.primary,
        }}
      >
        {condition.name}
      </Text>

      {condition.description && (
        <Text
          style={{
            marginTop: spacing.xs,
            fontSize: 13,
            color: colors.mutedText,
          }}
          numberOfLines={2}
        >
          {condition.description}
        </Text>
      )}
    </Pressable>
  )
}
