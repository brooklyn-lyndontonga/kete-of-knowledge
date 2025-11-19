import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import api from "../../../lib/api"   // ✅ FIXED IMPORT PATH

export default function SymptomsScreen() {
  const navigation = useNavigation()

  const [form, setForm] = useState({
    symptom: "",
    severity: "",
    notes: "",
  })

  const [symptoms, setSymptoms] = useState([])

  // Fetch symptoms from backend
  async function loadSymptoms() {
    try {
      const data = await api.get("/symptoms")
      setSymptoms(data)
    } catch (err) {
      console.error("Error loading symptoms:", err)
    }
  }

  // Add a new symptom
  async function addSymptom() {
    if (!form.symptom.trim()) return

    try {
      await api.post("/symptoms", {
        date: new Date().toISOString().slice(0, 10),
        symptom: form.symptom,
        severity: Number(form.severity) || 1,
        notes: form.notes,
      })

      setForm({ symptom: "", severity: "", notes: "" })
      loadSymptoms()
    } catch (err) {
      console.error("Error adding symptom:", err)
    }
  }

  useEffect(() => {
    loadSymptoms()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log a Symptom</Text>

      {/* Form */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Symptom name (e.g. Fatigue)"
          value={form.symptom}
          onChangeText={(t) => setForm({ ...form, symptom: t })}
        />

        <TextInput
          style={styles.input}
          placeholder="Severity (1-5)"
          value={form.severity}
          onChangeText={(t) => setForm({ ...form, severity: t })}
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Notes (optional)"
          value={form.notes}
          onChangeText={(t) => setForm({ ...form, notes: t })}
          multiline
        />

        <TouchableOpacity style={styles.addBtn} onPress={addSymptom}>
          <Text style={styles.addText}>Add Symptom</Text>
        </TouchableOpacity>
      </View>

      {/* Tracker */}
      <TouchableOpacity
        style={styles.trackerBtn}
        onPress={() => navigation.navigate("SymptomTracker")}
      >
        <Text style={styles.trackerText}>📊 View Tracker</Text>
      </TouchableOpacity>

      {/* List */}
      <Text style={styles.subtitle}>Recent Symptoms</Text>

      {symptoms.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <Text style={styles.symptom}>{item.symptom}</Text>
          <Text style={styles.meta}>Severity: {item.severity}</Text>
          <Text style={styles.meta}>{item.date}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 16, marginVertical: 12, fontWeight: "700" },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addBtn: {
    backgroundColor: "#267f53",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "700" },
  trackerBtn: {
    backgroundColor: "#99b7f5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  trackerText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  symptom: { fontWeight: "700", fontSize: 15 },
  meta: { opacity: 0.7, fontSize: 12 },
})
