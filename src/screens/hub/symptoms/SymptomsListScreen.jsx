/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, FlatList, Pressable } from "react-native"
import { useAppData } from "../../../app/providers/AppDataProvider"

export default function SymptomsListScreen({ navigation }) {
  const [symptoms, setSymptoms] = useState([])
  const { deleteSymptom } = useAppData()

  const fetchSymptoms = async () => {
    const fetchedSymptoms = await useAppData().getSymptoms()
    setSymptoms(fetchedSymptoms)
  }

  React.useEffect(() => {
    fetchSymptoms()
  }, [])

  return (
    <View style={{ padding: 16 }}>
      <Pressable onPress={() => navigation.navigate("LogSymptom")}>
        <Text style={{ color: "blue" }}>　　Log Symptom</Text>
      </Pressable>

      <FlatList
        data={symptoms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 12 }}>
            <Text>{item.name}</Text>
            <Text>Severity: {item.severity}</Text>
            <Pressable onPress={() => deleteSymptom(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}