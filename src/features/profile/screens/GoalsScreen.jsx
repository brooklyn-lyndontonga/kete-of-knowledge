import React from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"

const sampleGoals = [
  { id: "1", title: "Walk 3× per week", whakatauki: "Mā te huruhuru ka rere te manu" },
  { id: "2", title: "Drink more water", whakatauki: "He wai kei aku kamo" },
]

export default function GoalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ngā Whāinga (Goals)</Text>

      <FlatList
        data={sampleGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalCard}>
            <Text style={styles.goal}>{item.title}</Text>
            <Text style={styles.quote}>{item.whakatauki}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>＋ Add Goal</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 20 },
  goalCard: {
    backgroundColor: "#f6f6f6",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  goal: { fontFamily: "Poppins_500Medium", color: "#111" },
  quote: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 12, color: "#555" },
  addButton: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  addText: { color: "#fff", fontFamily: "Poppins_700Bold" },
})
