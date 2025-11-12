import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function RongoaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rongoā Māori</Text>
      <Text style={styles.text}>
        A space for mirimiri, karakia, and natural supports for your wellbeing journey.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 12 },
  text: { fontFamily: "Poppins_400Regular", lineHeight: 22 },
})
