/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import api from "../../../lib/api"

export default function MedicineDetailScreen({ route }) {
  const { id } = route.params
  const [med, setMed] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await api.get(`/medicines/${id}`)
      setMed(data)
    } catch (error) {
      console.log("Error loading medicine:", error)
    }
  }

  if (!med) return <Text>Loading...</Text>

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{med.name}</Text>
      <Text style={styles.category}>{med.category}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text>{med.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dosage Info</Text>
        <Text>{med.dosageInfo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Side Effects</Text>
        <Text>{med.sideEffects}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  name: { fontSize: 26, fontWeight: "700", marginBottom: 4 },
  category: { fontSize: 16, color: "#777", marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontWeight: "700", marginBottom: 6 },
})
