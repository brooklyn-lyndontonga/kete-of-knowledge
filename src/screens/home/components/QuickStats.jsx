import React from "react"
import { View, Text } from "react-native"
import { useLatestSymptom } from "../../../hooks/useLatestSymptom"

export default function QuickStats() {
  console.log("📊 QuickStats rendered")

  const { latest, loading } = useLatestSymptom()

  if (loading) {
    return <Text style={{ color: "#666" }}>Loading…</Text>
  }

  if (!latest) {
    return <Text style={{ color: "#666" }}>No symptoms logged yet</Text>
  }

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontSize: 14, color: "#666" }}>
        Latest symptom
      </Text>

      <Text style={{ marginTop: 4 }}>
        Severity: {latest.severity}/5
      </Text>

      <Text style={{ marginTop: 4, color: "#555" }}>
        {latest.date}
      </Text>
    </View>
  )
}
