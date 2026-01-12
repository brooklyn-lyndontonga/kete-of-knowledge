import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSymptoms } from "../../hooks/useSymptoms"

export default function SymptomTrackerScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const conditionId = route.params?.conditionId ?? null

  const { addSymptom } = useSymptoms()

  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("5")
  const [notes, setNotes] = useState("")

  const handleSave = async () => {
    if (!symptom) return

    await addSymptom({
      symptom,
      severity: Number(severity),
      notes,
      conditionId,
      date: new Date().toISOString(),
    })

    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        Log a symptom
      </Text>

      {conditionId && (
        <Text style={{ marginBottom: 8, color: "#666" }}>
          Linked to this condition
        </Text>
      )}

      <Text>Symptom</Text>
      <TextInput
        value={symptom}
        onChangeText={setSymptom}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginBottom: 12,
        }}
      />

      <Text>Severity (1–10)</Text>
      <TextInput
        value={severity}
        onChangeText={setSeverity}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginBottom: 12,
        }}
      />

      <Text>Notes (optional)</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          height: 80,
          marginBottom: 24,
        }}
      />

      <TouchableOpacity onPress={handleSave}>
        <Text style={{ fontSize: 18 }}>Save symptom</Text>
      </TouchableOpacity>
    </View>
  )
}
