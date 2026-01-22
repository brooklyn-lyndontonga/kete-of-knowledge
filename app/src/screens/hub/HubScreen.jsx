/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function HubScreen({ navigation }) {
  console.log("❤️ HubScreen rendered")

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Taku Manawa
      </Text>

      <Pressable onPress={() => navigation.navigate("Symptoms")}>
        <Text style={{ paddingVertical: 12 }}>🩺 Symptoms</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Medicines")}>
        <Text style={{ paddingVertical: 12 }}>🌿 Medicines</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Checklist")}>
        <Text style={{ paddingVertical: 12 }}>📋 Checklist</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Notes")}>
        <Text style={{ paddingVertical: 12 }}>📝 Notes</Text>
      </Pressable>
    </View>
  )
}
