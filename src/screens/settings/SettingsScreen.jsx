/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"
import ProfileRow from "../../components/ProfileRow"

export default function SettingsScreen({ navigation }) {
  console.log("⚙️ SettingsScreen rendered")

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Settings
      </Text>

      {/* Static settings */}
      <ProfileRow label="Language" value="English / Te Reo" />

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to Notifications")
          navigation.navigate("Notifications")
        }}
        style={{ paddingVertical: 12 }}
      >
        <Text>Notifications</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to DataManagement")
          navigation.navigate("DataManagement")
        }}
        style={{ paddingVertical: 12 }}
      >
        <Text>My data</Text>
      </Pressable>

      <Pressable
        onPress={() => console.log("🚪 Logout pressed (stub)")}
        style={{ paddingVertical: 12 }}
      >
        <Text>Log out</Text>
      </Pressable>
    </View>
  )
}
