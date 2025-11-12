import React from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"

const whakatauki = [
  { id: "1", text: "Mā te huruhuru ka rere te manu", meaning: "Adorn the bird with feathers so it may fly." },
  { id: "2", text: "He aha te mea nui o te ao? He tāngata, he tāngata, he tāngata.", meaning: "What is the most important thing in the world? It is people." },
]

export default function WhakataukiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ngā Whakataukī</Text>

      <FlatList
        data={whakatauki}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>“{item.text}”</Text>
            <Text style={styles.meaning}>{item.meaning}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 22, color: "#267f53", marginBottom: 20 },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  text: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 16, color: "#333" },
  meaning: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "#555", marginTop: 4 },
})
