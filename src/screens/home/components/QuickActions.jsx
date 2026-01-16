/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

export default function QuickActions({ navigation }) {
  console.log("🚀 QuickActions rendered")

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("LogSymptom")}
        style={{ paddingVertical: 12 }}
      >
        <Text>➕ Log symptom</Text>
      </Pressable>
    </View>
  )
}
