import React, { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native"

export default function MyMedicinesScreen() {
  const [meds, setMeds] = useState([])
  const [newMed, setNewMed] = useState("")

  const addMedicine = () => {
    if (newMed.trim()) {
      setMeds([...meds, { id: Date.now().toString(), text: newMed }])
      setNewMed("")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 My Medicines</Text>
      <TextInput
        style={styles.input}
        value={newMed}
        onChangeText={setNewMed}
        placeholder="Add medicine name..."
      />
      <Button title="Add Medicine" onPress={addMedicine} />

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medItem}>
            <Text style={styles.medText}>• {item.text}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  medItem: { paddingVertical: 6 },
  medText: { fontSize: 16 },
})
