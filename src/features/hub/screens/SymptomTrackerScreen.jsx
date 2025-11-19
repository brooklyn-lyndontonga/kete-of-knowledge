import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import api from "../../../lib/api"   // ✅ FIXED PATH

export default function SymptomTrackerScreen() {
  const [summary, setSummary] = useState({})

  async function loadSummary() {
    try {
      const data = await api.get("/symptoms/summary")
      setSummary(data)
    } catch (err) {
      console.error("Error loading summary:", err)
    }
  }

  useEffect(() => {
    loadSummary()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Symptom Tracker Summary</Text>

      {Object.entries(summary).map(([symptom, entries]) => (
        <View key={symptom} style={styles.card}>
          <Text style={styles.symptom}>{symptom}</Text>

          <Text style={styles.meta}>
            Logged: {entries.length} time(s)
          </Text>

          <Text style={styles.meta}>
            Avg Severity:{" "}
            {(
              entries.reduce((a, b) => a + b.severity, 0) / entries.length
            ).toFixed(1)}
          </Text>

          <Text style={styles.meta}>Most Recent: {entries[0]?.date}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  symptom: { fontSize: 18, fontWeight: "700" },
  meta: { fontSize: 14, opacity: 0.7, marginTop: 6 },
})
