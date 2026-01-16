/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable } from "react-native"
import { useAppData } from "../../hooks/useAppData"

export default function SymptomsScreen({ navigation }) {
  console.log("🩺 SymptomsScreen rendered")

  const { symptoms } = useAppData()

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Symptoms
      </Text>

      {symptoms.length === 0 && <Text>No symptoms yet</Text>}

      {symptoms.map((s) => (
        <Text key={s.id}>
          • {s.date} — severity {s.severity}
        </Text>
      ))}

      <Pressable
        onPress={() => navigation.navigate("LogSymptom")}
        style={{ marginTop: 24 }}
      >
        <Text>➕ Log symptom</Text>
      </Pressable>
    </View>
  )
}
