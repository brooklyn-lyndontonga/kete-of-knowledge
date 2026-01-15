import React from "react"
import { View, Text } from "react-native"
import { useLatestSymptom } from "../../../hooks/useLatestSymptom"

export default function QuickStats() {
  console.log("📊 QuickStats rendered")

  const latest = useLatestSymptom()

  if (!latest) {
    return <Text>No symptoms logged yet 🌿</Text>
  }

  return (
    <View>
      <Text style={{ fontWeight: "600" }}>Latest symptom</Text>
      <Text>
        {latest.symptom} · Severity {latest.severity}
      </Text>
      <Text style={{ color: "#666", fontSize: 12 }}>
        {latest.date}
      </Text>
    </View>
  )
}
