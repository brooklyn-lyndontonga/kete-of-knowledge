/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function HubScreen({ navigation }) {
  console.log("❤️ HubScreen rendered")

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Taku Manawa
      </Text>

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to Symptoms")
          navigation.navigate("Symptoms")
        }}
        style={{ paddingVertical: 12 }}
      >
        <Text>🩺 Symptoms</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to Checklist")
          navigation.navigate("Checklist")
        }}
        style={{ paddingVertical: 12 }}
      >
        <Text>📋 Daily check-in</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to Medicines")
          navigation.navigate("Medicines")
        }}
        style={{ paddingVertical: 12 }}
      >
        <Text>🌿 Medicines & Rongoā</Text>
      </Pressable>
    </View>
  )
}
