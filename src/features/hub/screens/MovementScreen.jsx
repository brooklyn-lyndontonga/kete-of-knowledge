import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function MovementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movement & Hauora</Text>
      <Text style={styles.text}>
        Track your movement activities and achievements here — from kapa haka to walking.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 12 },
  text: { fontFamily: "Poppins_400Regular", lineHeight: 22 },
})
