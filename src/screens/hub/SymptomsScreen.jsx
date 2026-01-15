/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function SymptomsScreen({ navigation }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
        Symptoms
      </Text>

      {/* Placeholder list */}
      <Text style={{ color: "#666" }}>
        No symptoms logged yet.
      </Text>

      <Pressable
        onPress={() => navigation.navigate("LogSymptom")}
        style={{ marginTop: 24 }}
      >
        <Text>➕ Log a symptom</Text>
      </Pressable>
    </View>
  )
}
