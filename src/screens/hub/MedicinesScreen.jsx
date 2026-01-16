import React from "react"
import { View, Text } from "react-native"
import medicines from "../../data/medicines.json"

export default function MedicinesScreen() {
  console.log("🌿 MedicinesScreen rendered")

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Medicines & Rongoā
      </Text>

      {medicines.map((m) => (
        <Text key={m.id} style={{ paddingVertical: 8 }}>
          • {m.name}
        </Text>
      ))}
    </View>
  )
}
