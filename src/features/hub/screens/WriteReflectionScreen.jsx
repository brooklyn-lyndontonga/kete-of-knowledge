/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { API_URL } from "../../../lib/api"

export default function WriteReflectionScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [story, setStory] = useState("")

  async function save() {
    await fetch(`${API_URL}/reflections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, story }),
    })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Reflection</Text>
      <TextInput
        value={story}
        onChangeText={setStory}
        multiline
        style={{ borderWidth: 1, height: 150, textAlignVertical: "top" }}
      />

      <Button title="Save Reflection" onPress={save} />
    </View>
  )
}
