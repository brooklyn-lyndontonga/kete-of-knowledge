/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, ScrollView } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useTheme } from "../../../theme"

function Section({ title, items }) {
  if (!items || items.length === 0) return null

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        {title}
      </Text>

      {items.map((item, i) => (
        <Text key={i} style={{ marginBottom: 4 }}>
          • {item}
        </Text>
      ))}
    </View>
  )
}

export default function ConditionDetailScreen() {
  const { params } = useRoute()
  const { condition } = params
  const { spacing, typography } = useTheme()

  return (
    <ScrollView style={{ padding: spacing.lg }}>
      <Text
        style={{
          fontFamily: typography.heading,
          fontSize: 22,
          marginBottom: spacing.sm,
        }}
      >
        {condition.name}
      </Text>

      {condition.description && (
        <Text style={{ marginBottom: spacing.md }}>
          {condition.description}
        </Text>
      )}

      <Section title="Triggers" items={condition.triggers} />
      <Section title="Treatments" items={condition.treatments} />
      <Section title="Helpful images" items={condition.images} />
    </ScrollView>
  )
}
