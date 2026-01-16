/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HubScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>❤️ Taku Manawa</Text>

      <Pressable style={card}>
        <Text style={title}>My symptoms</Text>
      </Pressable>

      <Pressable style={card}>
        <Text style={title}>My medicines</Text>
      </Pressable>

      <Pressable style={card}>
        <Text style={title}>Checklists & reminders</Text>
      </Pressable>

      <Pressable style={card}>
        <Text style={title}>Notes</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  )
}

const card = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#F5F5F5",
  marginBottom: 12,
}

const title = {
  fontSize: 16,
}
