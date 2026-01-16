/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SettingsScreen({ navigation }) {
  console.log("⚙️ SettingsScreen rendered")

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Settings
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Notifications")}
        style={{ paddingVertical: 12 }}
      >
        <Text>Notifications</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("DataManagement")}
        style={{ paddingVertical: 12 }}
      >
        <Text>My data</Text>
      </Pressable>

      <Pressable
        onPress={() => console.log("Logout")}
        style={{ paddingVertical: 12 }}
      >
        <Text>Log out</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  )
}
