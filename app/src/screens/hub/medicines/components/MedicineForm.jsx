/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"

export default function MedicineForm({ editing, onSaved, onCancel }) {
  const [name, setName] = useState("")

  useEffect(() => {
    if (editing) setName(editing.name)
  }, [editing])

  async function submit() {
    const url = editing
      ? `${API_URL}/medicines/${editing.id}`
      : `${API_URL}/medicines`

    await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    onSaved()
  }

  return (
    <View>
      <TextInput placeholder="Medicine name" value={name} onChangeText={setName} />
      <Button title={editing ? "Update" : "Add"} onPress={submit} />
      {editing && <Button title="Cancel" onPress={onCancel} />}
    </View>
  )
}
