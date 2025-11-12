import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"

export default function DataSettingsScreen() {
  const handleExport = () => Alert.alert("Coming Soon", "Data export feature coming soon!")
  const handleDelete = () => Alert.alert("Coming Soon", "Data deletion feature coming soon!")

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data & Privacy</Text>

      <TouchableOpacity style={styles.button} onPress={handleExport}>
        <Text style={styles.buttonText}>📤 Export My Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.delete]} onPress={handleDelete}>
        <Text style={styles.buttonText}>🗑️ Delete My Data</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 20 },
  button: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  delete: { backgroundColor: "#f5793b" },
  buttonText: { color: "#fff", fontFamily: "Poppins_500Medium" },
})
