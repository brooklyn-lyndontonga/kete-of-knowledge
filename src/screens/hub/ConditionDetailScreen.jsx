/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"
import conditions from "../../data/conditions.json"

export default function ConditionDetailScreen({ route }) {
  console.log("📖 ConditionDetailScreen rendered")

  const { id } = route.params
  const condition = conditions.find((c) => c.id === id)

  if (!condition) {
    return <Text>Condition not found</Text>
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        {condition.name}
      </Text>

      <Text style={{ marginTop: 12 }}>{condition.description}</Text>

      <Text style={{ marginTop: 16, fontWeight: "600" }}>Triggers</Text>
      <Text>{condition.triggers}</Text>

      <Text style={{ marginTop: 16, fontWeight: "600" }}>Supports</Text>
      <Text>{condition.treatments}</Text>
    </View>
  )
}
