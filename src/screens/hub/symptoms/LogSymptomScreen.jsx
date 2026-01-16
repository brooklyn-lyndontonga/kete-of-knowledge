/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { useAppData } from "../../../hooks/useAppData"

export default function LogSymptomScreen({ navigation }) {
  console.log("➕ LogSymptomScreen rendered")

  const { addSymptom } = useAppData()
  const [severity, setSeverity] = useState("")
  const [notes, setNotes] = useState("")

  function save() {
    addSymptom({
      id: Date.now().toString(),
      date: new Date().toISOString().slice(0, 10),
      severity,
      notes,
    })
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Log symptom
      </Text>

      <TextInput
        placeholder="Severity (1–5)"
        value={severity}
        onChangeText={setSeverity}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={{ borderWidth: 1, padding: 12, marginBottom: 24 }}
      />

      <Pressable onPress={save}>
        <Text>Save</Text>
      </Pressable>
    </View>
  )
}
