/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { useContext } from "react"
import { AppDataContext } from "../../../context/AppDataContext"


export default function LogSymptomScreen({ navigation }) {
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("")

  const { addSymptom } = useContext(AppDataContext)

function handleSave() {
  addSymptom({
    id: Date.now(),
    symptom,
    severity,
    date: new Date().toISOString(),
  })

  navigation.goBack()
}

  function handleSave() {
    // MVP: console.log
    console.log({ symptom, severity })

    navigation.goBack()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Log a symptom
      </Text>

      <TextInput
        placeholder="What are you feeling?"
        value={symptom}
        onChangeText={setSymptom}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />

      <TextInput
        placeholder="Severity (1–5)"
        value={severity}
        onChangeText={setSeverity}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 24 }}
      />

      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
    </View>
  )
}
