/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"

export default function SymptomTrackerScreen() {
  const [entries, setEntries] = useState([
    { id: "1", date: "Nov 12", symptom: "Fatigue" },
    { id: "2", date: "Nov 13", symptom: "Shortness of breath" },
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Symptom Tracker</Text>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.symptom}>{item.symptom}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>＋ Add New Entry</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 20 },
  entry: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  date: { fontFamily: "Poppins_500Medium", color: "#267f53" },
  symptom: { fontFamily: "Poppins_400Regular" },
  addButton: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#fff", fontFamily: "Poppins_700Bold" },
})
