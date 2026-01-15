/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"
import conditions from "../../data/conditions.json"

export default function ConditionScreen({ route }) {
  const { id } = route.params
  const condition = conditions.find((c) => c.id === id)

  if (!condition) {
    return <Text>Condition not found.</Text>
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {condition.name}
      </Text>

      <Text style={{ marginTop: 12 }}>
        {condition.body}
      </Text>

      {condition.culturalNote && (
        <Text style={{ marginTop: 16, fontStyle: "italic", color: "#555" }}>
          {condition.culturalNote}
        </Text>
      )}
    </View>
  )
}
