import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function HubHomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 24 }}>
        Your health tools
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Symptoms")}
        style={{ marginBottom: 12 }}
      >
        <Text>Log symptoms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ManageConditions")}
      >
        <Text>Manage conditions</Text>
      </TouchableOpacity>
    </View>
  )
}
