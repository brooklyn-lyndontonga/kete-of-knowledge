import React, { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native"

export default function GoalsScreen() {
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState("")

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now().toString(), text: newGoal }])
      setNewGoal("")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 My Goals</Text>
      <TextInput
        style={styles.input}
        value={newGoal}
        onChangeText={setNewGoal}
        placeholder="Enter a new goal..."
      />
      <Button title="Add Goal" onPress={addGoal} />

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>• {item.text}</Text>
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
  goalItem: { paddingVertical: 6 },
  goalText: { fontSize: 16 },
})
