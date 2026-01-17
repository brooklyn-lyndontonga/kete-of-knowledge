/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { useAppData } from "../../app/providers/AppDataProvider"


export default function EditProfileScreen({ navigation }) {
  console.log("✏️ EditProfileScreen rendered")

  const { profile, setProfile } = useAppData()
  const [name, setName] = useState(profile.name)

  function save() {
    setProfile({ ...profile, name })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Edit profile
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={save}
        style={{
          padding: 12,
          backgroundColor: "#222",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Save
        </Text>
      </Pressable>
    </View>
  )
}
