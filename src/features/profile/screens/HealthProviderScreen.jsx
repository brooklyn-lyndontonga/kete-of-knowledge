import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"

export default function HealthProviderScreen() {
  const [clinic, setClinic] = useState("")
  const [provider, setProvider] = useState("")
  const [contact, setContact] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tō Kaiwhakarato Hauora</Text>

      <TextInput
        style={styles.input}
        placeholder="Clinic Name"
        value={clinic}
        onChangeText={setClinic}
      />
      <TextInput
        style={styles.input}
        placeholder="Provider Name"
        value={provider}
        onChangeText={setProvider}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>💾 Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontFamily: "Poppins_400Regular",
  },
  saveButton: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontFamily: "Poppins_700Bold" },
})
