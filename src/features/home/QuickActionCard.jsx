/* eslint-disable react/prop-types */
import React from "react"
import { Text, Pressable } from "react-native"
import Card from "../../components/Card"
import { useTheme } from "../../theme"
import { spacing, typography } from "../../theme/theme"

export default function QuickActionCard({ title, subtitle, onPress }) {
  const { colors } = useTheme()

  return (
    <Pressable onPress={onPress}>
      <Card tone="accent">
        <Text
          style={{
            fontFamily: typography.h2,
            color: colors.ink,
            marginBottom: spacing.xs,
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text style={{ opacity: 0.75 }}>
            {subtitle}
          </Text>
        )}
      </Card>
    </Pressable>
  )
}
