/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { AppDataContext } from "../../context/AppDataContext"

export default function EditProfileScreen({ navigation }) {
  const { updateProfile } = useContext(AppDataContext)
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")

  function handleSave() {
    updateProfile({ name, goal })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "600", marginBottom: 12 }}>
        Edit profile
      </Text>

      <TextInput
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />

      <TextInput
        placeholder="Health intention or goal"
        value={goal}
        onChangeText={setGoal}
        style={{ borderBottomWidth: 1, marginBottom: 24 }}
      />

      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
    </View>
  )
}
