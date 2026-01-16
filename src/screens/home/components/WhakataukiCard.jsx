import React from "react"
import { View, Text } from "react-native"
import whakatauki from "../../../data/whakatauki.json"

export default function WhakataukiCard() {
  console.log("🌿 WhakataukiCard rendered")

  const item = whakatauki[Math.floor(Math.random() * whakatauki.length)]

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
