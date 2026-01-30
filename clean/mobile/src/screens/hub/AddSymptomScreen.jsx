/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, TextInput, Button } from "react-native"
import { useState } from "react"

import { addSymptom } from "../../features/symptoms.db.js"

export default function AddSymptomScreen({ navigation }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")
  const [notes, setNotes] = useState("")

  async function save() {
    if (!symptom) return
    await addSymptom({
      symptom,
      severity: Number(severity) || null,
      notes,
    })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="Symptom" value={symptom} onChangeText={setSymptom} />
      <TextInput placeholder="Severity (1–10)" value={severity} onChangeText={setSeverity} />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} />
      <Button title="Save" onPress={save} />
    </View>
  )
}
