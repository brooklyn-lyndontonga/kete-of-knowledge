/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text, TextInput, Button } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export default function EditProfileFocus({ navigation }) {
  const [focus, setFocus] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const res = await fetch(`${API_URL}/profile`)
    const data = await res.json()
    setFocus(data.goals || "")
  }

  async function save() {
    await fetch(`${API_URL}/profile/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: focus }),
    })

    navigation.goBack()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Edit focus
      </Text>

      <TextInput
        placeholder="What matters most right now?"
        value={focus}
        onChangeText={setFocus}
        multiline
      />

      <Button title="Save" onPress={save} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  )
}
