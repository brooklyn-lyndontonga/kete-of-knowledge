 
import React from "react"
import { View, Text } from "react-native"
import { useContext } from "react"
import { AppDataContext } from "../../../context/AppDataContext"



export default function QuickStats() {
  const { symptoms } = useContext(AppDataContext)

  const latest = symptoms[symptoms.length - 1]

  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}> Today </Text>
      <Text>• Latest symptom:{" "} {latest ? latest.symptom : "—"}</Text>
      <Text>• Checklist items remaining: —</Text>
    </View>
  )
}
