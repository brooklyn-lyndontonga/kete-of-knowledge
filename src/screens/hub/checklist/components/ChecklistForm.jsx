/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"

export default function ChecklistForm({ editing, onSaved, onCancel }) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (editing) setTitle(editing.title)
  }, [editing])

  async function submit() {
    const url = editing
      ? `${API_URL}/checklist/${editing.id}`
      : `${API_URL}/checklist`

    await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    setTitle("")
    onSaved()
  }

  return (
    <View>
      <TextInput placeholder="Task" value={title} onChangeText={setTitle} />
      <Button title={editing ? "Update" : "Add"} onPress={submit} />
      {editing && <Button title="Cancel" onPress={onCancel} />}
    </View>
  )
}
