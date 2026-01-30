/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, TextInput, Button } from "react-native"
import { useState } from "react"
import { addGoal } from "../../features/goals.db.js"

export default function AddGoalScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function save() {
    if (!title) return
    await addGoal({ title, description })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Goal title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Notes (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Save Goal" onPress={save} />
    </View>
  )
}
