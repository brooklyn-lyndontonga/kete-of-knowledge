import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whakamaumaharatanga (Reminders)</Text>
      <Text style={styles.text}>Your reminder list and notifications will appear here soon.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontFamily: "Poppins_700Bold", fontSize: 18, color: "#267f53", marginBottom: 10 },
  text: { fontFamily: "Poppins_400Regular", textAlign: "center" },
})
