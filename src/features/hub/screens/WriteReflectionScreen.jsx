/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { useRoute } from "@react-navigation/native"
import { API_URL } from "../../../lib/api"

export default function WriteReflectionScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [story, setStory] = useState("")

  const route = useRoute()
  const initialPrompt = route.params?.prompt ?? ""

  async function save() {
    await fetch(`${API_URL}/reflections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, story }),
    })

    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Prompt (if present) */}
      {initialPrompt ? (
        <View
          style={{
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            backgroundColor: "#F7F1EA",
          }}
        >
          <Text style={{ fontStyle: "italic" }}>
            {initialPrompt}
          </Text>
        </View>
      ) : null}

      {/* Title */}
      <Text style={{ marginBottom: 4 }}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginBottom: 12,
        }}
      />

      {/* Reflection */}
      <Text style={{ marginBottom: 4 }}>Reflection</Text>
      <TextInput
        value={story}
        onChangeText={setStory}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          height: 150,
          padding: 8,
          textAlignVertical: "top",
          marginBottom: 16,
        }}
      />

      <Button title="Save Reflection" onPress={save} />
    </View>
  )
}
