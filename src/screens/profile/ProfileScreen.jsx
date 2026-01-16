/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 16 }}>
      
      <View style={card}>
        <Text style={{ fontSize: 14, color: "#666" }}>Identity</Text>
        <Text style={{ fontSize: 18, marginTop: 4 }}>This kete</Text>
      </View>

      <View style={[card, { marginTop: 16 }]}>
        <Text>Health goals</Text>
      </View>

      <Pressable style={[card, { marginTop: 24 }]}>
        <Text>Edit profile</Text>
      </Pressable>

    </View>
    </SafeAreaView>
  )
}

const card = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#F5F5F5",
}
