/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, ScrollView } from "react-native"
import conditions from "../../data/conditions.json"

export default function ConditionScreen({ route }) {
  const { id } = route.params
  console.log("📖 ConditionScreen rendered:", id)

  const condition = conditions.find((c) => c.id === id)

  if (!condition) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Condition not found.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {condition.name}
      </Text>

      <Text
        style={{
          fontSize: 15,
          lineHeight: 22,
          color: "#444",
        }}
      >
        {condition.content}
      </Text>
    </ScrollView>
  )
}
