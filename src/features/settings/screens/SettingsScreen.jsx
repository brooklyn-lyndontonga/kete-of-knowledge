import React, { useState } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from "react-native"

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleLanguageToggle = () => {
    setLanguage(language === "English" ? "Te Reo Māori" : "English")
  }

  const handlePrivacy = () => Alert.alert("Privacy Policy", "Coming soon...")
  const handleHelp = () => Alert.alert("Help & Feedback", "Coming soon...")
  const handleAbout = () =>
    Alert.alert("About Kete of Knowledge", "Version 1.0 — Created with aroha and kaupapa Māori.")

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tautuhinga (Settings)</Text>
      <Text style={styles.sub}>Manage your preferences and app information</Text>

      {/* Language Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Language / Reo</Text>
        <TouchableOpacity style={styles.buttonSmall} onPress={handleLanguageToggle}>
          <Text style={styles.buttonTextSmall}>{language}</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#ccc", true: "#267f53" }}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handlePrivacy}>
        <Text style={styles.buttonText}>🔒 Privacy & Consent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleHelp}>
        <Text style={styles.buttonText}>💬 Help & Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAbout}>
        <Text style={styles.buttonText}>ℹ️ About Kete of Knowledge</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.version}>App version 1.0.0</Text>
        <Text style={styles.made}>Made with ❤️ in Aotearoa</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 24, color: "#267f53" },
  sub: { fontFamily: "Poppins_400Regular", color: "#666", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontFamily: "Poppins_500Medium", color: "#333", fontSize: 16 },
  button: {
    backgroundColor: "#267f53",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontFamily: "Poppins_700Bold" },
  buttonSmall: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonTextSmall: { fontFamily: "Poppins_500Medium", color: "#267f53" },
  footer: { alignItems: "center", marginTop: 40 },
  version: { fontFamily: "Poppins_400Regular", color: "#888" },
  made: { fontFamily: "Poppins_400Regular", color: "#aaa", marginTop: 4 },
})
