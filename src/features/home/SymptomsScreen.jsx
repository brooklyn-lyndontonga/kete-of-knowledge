import React, { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native"

export default function SymptomsScreen() {
  const [symptoms, setSymptoms] = useState([])
  const [newSymptom, setNewSymptom] = useState("")

  const addSymptom = () => {
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, { id: Date.now().toString(), text: newSymptom }])
      setNewSymptom("")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Symptoms Log</Text>
      <TextInput
        style={styles.input}
        value={newSymptom}
        onChangeText={setNewSymptom}
        placeholder="Describe your symptom..."
      />
      <Button title="Add Symptom" onPress={addSymptom} />

      <FlatList
        data={symptoms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.symptomItem}>
            <Text style={styles.symptomText}>• {item.text}</Text>
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
  symptomItem: { paddingVertical: 6 },
  symptomText: { fontSize: 16 },
})
