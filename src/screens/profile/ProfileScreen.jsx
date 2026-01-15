/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"

import ProfileHeader from "./components/ProfileHeader"
import ProfileRow from "../../components/ProfileRow"

export default function ProfileScreen({ navigation }) {
  console.log("👤 ProfileScreen rendered")

  return (
    <View style={{ padding: 16 }}>
      <ProfileHeader />

      <View style={{ marginTop: 24 }}>
        <ProfileRow label="Health goals" value="View" />
      </View>

      <Pressable
        onPress={() => {
          console.log("➡️ Navigate to EditProfile")
          navigation.navigate("EditProfile")
        }}
        style={{ marginTop: 32 }}
      >
        <Text>✏️ Edit profile</Text>
      </Pressable>
    </View>
  )
}
