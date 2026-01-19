/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function ProfileGoalsPreview({ goals, onEdit }) {
  const active =
    Array.isArray(goals)
      ? goals.find((g) => g.active)
      : null

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontWeight: "600" }}>Goals</Text>

      <Text>
        {active ? active.title : "No active goal"}
      </Text>

      <Pressable onPress={onEdit}>
        <Text style={{ color: "#007AFF", marginTop: 4 }}>
          Edit goals
        </Text>
      </Pressable>
    </View>
  )
}
