/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button } from "react-native"
import { useState } from "react"

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")

  function save() {
    if (!title) return
    // later → SQLite insert
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="Reminder title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Time (e.g. Morning)" value={time} onChangeText={setTime} />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} />
      <Button title="Save Reminder" onPress={save} />
    </View>
  )
}
