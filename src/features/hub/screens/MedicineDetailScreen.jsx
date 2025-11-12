/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function MedicineDetailScreen({ route }) {
  const { medicine } = route.params || { medicine: { name: "Medicine", purpose: "" } }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{medicine.name}</Text>
      <Text style={styles.text}>Purpose: {medicine.purpose}</Text>
      <Text style={styles.text}>Dosage, notes, and side effects info will go here.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 12 },
  text: { fontFamily: "Poppins_400Regular", lineHeight: 22 },
})
