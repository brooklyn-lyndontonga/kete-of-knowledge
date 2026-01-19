/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { View, Text, Pressable } from "react-native"
import { API_URL } from "../../../lib/api"

export default function QuickStats({ navigation }) {
  console.log("📊 QuickStats rendered")

  const [latestSymptom, setLatestSymptom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestSymptom()
  }, [])

  async function fetchLatestSymptom() {
    try {
      const res = await fetch(`${API_URL}/symptoms/latest`)
      const data = await res.json()

      if (data) {
        setLatestSymptom(data)
      }
    } catch (err) {
      console.warn("Failed to fetch latest symptom", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={{ padding: 16, backgroundColor: "#F5F5F5", borderRadius: 12 }}>
        <Text>Loading symptoms…</Text>
      </View>
    )
  }

  if (!latestSymptom) {
    return (
      <View style={{ padding: 16, backgroundColor: "#F5F5F5", borderRadius: 12 }}>
        <Text>No symptoms logged yet</Text>
      </View>
    )
  }

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Hub", {
          screen: "SymptomsList",
        })
      }
      style={{
        padding: 16,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
      }}
    >
      <Text style={{ fontWeight: "600" }}>Latest symptom</Text>
      <Text>{latestSymptom.symptom}</Text>
      <Text>Severity: {latestSymptom.severity}</Text>
      <Text>{latestSymptom.date}</Text>
    </Pressable>
  )
}
