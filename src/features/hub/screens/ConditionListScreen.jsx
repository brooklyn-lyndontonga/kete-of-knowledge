/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"

const sampleConditions = [
  { id: "1", name: "High Blood Pressure (Hypertension)" },
  { id: "2", name: "Rheumatic Fever" },
  { id: "3", name: "Heart Disease" },
]

export default function ConditionListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conditions & Risk Factors</Text>
      <FlatList
        data={sampleConditions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ConditionDetailScreen", { condition: item })
            }
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 20 },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  text: { fontFamily: "Poppins_400Regular", color: "#111" },
})
