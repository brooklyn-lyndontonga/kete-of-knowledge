/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function QuickActions({ navigation }) {
console.log("🚀 QuickActions rendered")

  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Quick actions
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Hub", { screen: "Symptoms" })}
        style={{ paddingVertical: 12 }}
      >
        <Text>➕ Log a symptom</Text>
      </Pressable>
    </View>
  )
}
