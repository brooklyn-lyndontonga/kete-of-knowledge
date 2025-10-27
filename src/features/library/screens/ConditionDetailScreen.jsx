import React from "react"
import { View, Text, ScrollView } from "react-native"
import { useTheme } from "../../../theme"

export default function ConditionDetailScreen({ route }) {
  const { colors, spacing, typography } = useTheme()
  const { condition } = route.params

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      <Text
        style={{
          fontFamily: typography.heading,
          fontSize: 24,
          color: colors.primary,
          marginBottom: spacing.md
        }}
      >
        {condition.name}
      </Text>

      <Text
        style={{
          fontFamily: typography.body,
          fontSize: 16,
          color: colors.text,
          marginBottom: spacing.lg
        }}
      >
        {condition.description}
      </Text>

      <Text
        style={{
          fontFamily: typography.medium,
          fontSize: 18,
          color: colors.accent1,
          marginBottom: spacing.sm
        }}
      >
        Common Symptoms
      </Text>

      {condition.symptoms.map((symptom, idx) => (
        <Text
          key={idx}
          style={{
            fontFamily: typography.body,
            fontSize: 16,
            color: colors.mutedText,
            marginBottom: 4
          }}
        >
          • {symptom}
        </Text>
      ))}
    </ScrollView>
  )
}
