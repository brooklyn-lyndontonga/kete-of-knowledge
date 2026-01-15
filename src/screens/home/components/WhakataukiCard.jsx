 
import React, { useMemo } from "react"
import { View, Text } from "react-native"
import { getRandomWhakatauki } from "../../../lib/whakatauki"

export default function WhakataukiCard() {
  console.log("🌿 WhakataukiCard rendered")

  // Stable per render (does not reshuffle during re-renders)
  const item = useMemo(() => getRandomWhakatauki(), [])

  if (!item) {
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#F2F2F2",
        }}
      >
        <Text style={{ fontStyle: "italic", color: "#666" }}>
          He whakataukī mō tēnei rā ka tae mai ākuanei 🌱
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {item.maori}
      </Text>

      {item.english && (
        <Text style={{ marginTop: 8, color: "#555" }}>
          {item.english}
        </Text>
      )}
    </View>
  )
}
