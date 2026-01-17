/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, TextInput, Pressable, Text } from "react-native"
import { useAppData } from "../../../app/providers/AppDataProvider"

export default function LogSymptomScreen({ navigation }) {
  console.log("➕ LogSymptomScreen rendered")

  const { addSymptom } = useAppData()
  const [symptomData, setSymptomData] = useState({ name: "", severity: "" })

  function handleSave() {
  const newSymptom = {
    id: Date.now(),
    name: symptomData.name,
    severity: symptomData.severity,
  }
  addSymptom(newSymptom)
  navigation.goBack()
}

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Symptom"
        value={symptomData.name}
        onChangeText={(text) => setSymptomData((prev) => ({ ...prev, name: text }))}
      />
      <TextInput
        placeholder="Severity (1–5)"
        value={symptomData.severity}
        onChangeText={(text) => setSymptomData((prev) => ({ ...prev, severity: text }))}
      />

      <Pressable onPress={handleSave}>
        <Text style={{ color: "blue" }}>Save</Text>
      </Pressable>
    </View>
  )
}