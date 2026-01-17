/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function QuickStats({ navigation, latestSymptom }) {
  console.log("📊 QuickStats rendered")

  if (!latestSymptom) {
    return (
      <View style={{ padding: 16, backgroundColor: "#F5F5F5", borderRadius: 12 }}>
        <Text>No symptoms logged yet</Text>
      </View>
    )
  }

  return (
    <Pressable
      onPress={() => navigation.navigate("Hub", { screen: "SymptomsList" })}
      style={{
        padding: 16,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
      }}
    >
      <Text style={{ fontWeight: "600" }}>Latest symptom</Text>
      <Text>{latestSymptom.name}</Text>
      <Text>Severity: {latestSymptom.severity}</Text>
      <Text>{latestSymptom.date}</Text>
    </Pressable>
  )
}
