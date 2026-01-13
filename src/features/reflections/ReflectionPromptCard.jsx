/* eslint-disable react/prop-types */
import React from "react"
import { Text } from "react-native"
import Card from "../../components/Card"
import { useTheme } from "../../theme"
import { spacing, typography } from "../../theme/theme"

export default function ReflectionPromptCard({ title, prompt }) {
  const { colors } = useTheme()

  return (
    <Card>
      <Text
        style={{
          fontFamily: typography.h2,
          color: colors.ink,
          marginBottom: spacing.sm,
        }}
      >
        {title}
      </Text>

      <Text style={{ opacity: 0.8 }}>
        {prompt}
      </Text>
    </Card>
  )
}
