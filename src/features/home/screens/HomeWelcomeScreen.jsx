import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function HomeWelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haere mai ki tō Kete o te Mātauranga</Text>
      <Text style={styles.text}>This is your welcome space for inspiration and updates.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontFamily: "Poppins_700Bold", fontSize: 18, color: "#267f53", marginBottom: 10 },
  text: { fontFamily: "Poppins_400Regular", textAlign: "center" },
})
