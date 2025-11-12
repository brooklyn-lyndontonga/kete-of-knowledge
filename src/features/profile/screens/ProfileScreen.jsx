/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tō Kōtaha</Text>
      <Text style={styles.sub}>Your personal space within Kete o te Mātauranga</Text>

      <View style={styles.profileCard}>
        <Text style={styles.name}>Brooklyn</Text>
        <Text style={styles.meta}>Age 29  •  Wāhine  •  Ngāti Porou</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GoalsScreen")}
      >
        <Text style={styles.buttonText}>🎯 My Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HealthProviderScreen")}
      >
        <Text style={styles.buttonText}>🏥 Health Provider Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DataSettingsScreen")}
      >
        <Text style={styles.buttonText}>⚙️ Data Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 22, color: "#267f53" },
  sub: { fontFamily: "Poppins_400Regular", color: "#555", marginBottom: 20 },
  profileCard: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  name: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#111" },
  meta: { fontFamily: "Poppins_400Regular", color: "#777" },
  button: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontFamily: "Poppins_500Medium" },
})
