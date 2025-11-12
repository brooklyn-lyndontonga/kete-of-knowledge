/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function HubHomeScreen({ navigation }) {
  const tiles = [
    { label: "Conditions & Risk Factors", target: "ConditionListScreen" },
    { label: "Symptoms Tracker", target: "SymptomTrackerScreen" },
    { label: "Managing My Conditions", target: "ConditionDetailScreen" },
    { label: "Medicines & Rongoā", target: "MedicinesListScreen" },
    { label: "Nutrition (Kai ā Nuku)", target: "NutritionScreen" },
    { label: "Movement & Hauora", target: "MovementScreen" },
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tāku Manawa</Text>
      <Text style={styles.sub}>Your wellbeing hub</Text>

      <View style={styles.grid}>
        {tiles.map((tile, i) => (
          <TouchableOpacity
            key={i}
            style={styles.tile}
            onPress={() => navigation.navigate(tile.target)}
          >
            <Text style={styles.tileText}>{tile.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 24, color: "#267f53" },
  sub: { fontFamily: "Poppins_400Regular", color: "#666", marginBottom: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  tileText: {
    fontFamily: "Poppins_500Medium",
    color: "#333",
    textAlign: "center",
  },
})
