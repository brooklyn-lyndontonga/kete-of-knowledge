/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"

export default function SymptomForm({ editing, onSaved, onCancel }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")

  useEffect(() => {
    if (editing) {
      setSymptom(editing.symptom)
      setSeverity(String(editing.severity))
    }
  }, [editing])

  async function submit() {
    const payload = { symptom, severity: Number(severity) }

    if (editing) {
      await fetch(`${API_URL}/symptoms/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`${API_URL}/symptoms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    setSymptom("")
    setSeverity("")
    onSaved()
  }

  return (
    <View>
      <TextInput
        placeholder="Symptom"
        value={symptom}
        onChangeText={setSymptom}
      />
      <TextInput
        placeholder="Severity (1–10)"
        value={severity}
        keyboardType="numeric"
        onChangeText={setSeverity}
      />
      <Button title={editing ? "Update" : "Log"} onPress={submit} />
      {editing && <Button title="Cancel" onPress={onCancel} />}
    </View>
  )
}
