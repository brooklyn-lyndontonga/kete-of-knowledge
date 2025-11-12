/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"

const medicines = [
  { id: "1", name: "Atenolol", purpose: "Blood pressure" },
  { id: "2", name: "Metformin", purpose: "Diabetes management" },
]

export default function MedicinesListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Medicines & Rongoā</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MedicineDetailScreen", { medicine: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.purpose}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 16 },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  name: { fontFamily: "Poppins_500Medium", color: "#111" },
  sub: { fontFamily: "Poppins_400Regular", color: "#555" },
})
