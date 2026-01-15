import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whakamaumaharatanga</Text>
      <Text style={styles.text}>Your reminders will appear here soon.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  text: { opacity: 0.8 },
})
