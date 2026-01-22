/* eslint-disable react/react-in-jsx-scope */
import { FlatList, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../lib/api"
import SymptomForm from "./components/SymptomForm"
import SymptomItem from "./components/SymptomItem"

export default function SymptomsScreen() {
  const [symptoms, setSymptoms] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchSymptoms()
  }, [])

  async function fetchSymptoms() {
    const res = await fetch(`${API_URL}/symptoms`)
    const data = await res.json()
    setSymptoms(data)
  }

  async function deleteSymptom(id) {
    await fetch(`${API_URL}/symptoms/${id}`, { method: "DELETE" })
    fetchSymptoms()
  }

  return (
    <FlatList
      data={symptoms}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>Symptoms</Text>

          <SymptomForm
            editing={editing}
            onSaved={() => {
              setEditing(null)
              fetchSymptoms()
            }}
            onCancel={() => setEditing(null)}
          />

          <Text style={{ marginTop: 24, fontWeight: "600" }}>
            History
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <SymptomItem
          item={item}
          onEdit={() => setEditing(item)}
          onDelete={() => deleteSymptom(item.id)}
        />
      )}
    />
  )
}
