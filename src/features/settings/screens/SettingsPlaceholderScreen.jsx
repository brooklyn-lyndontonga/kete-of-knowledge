import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity, Linking, Alert } from "react-native"
import Header from "../../../ui/components/Header"

export default function SettingsScreen() {
  const [language, setLanguage] = useState("te reo")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "te reo" ? "english" : "te reo"))
    Alert.alert("Language changed", `App is now displayed in ${language === "te reo" ? "English" : "Te Reo Māori"}.`)
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Ngā Tautuhinga" subtitle="Settings & Preferences" />

      {/* Language toggle */}
      <View style={styles.section}>
        <Text style={styles.label}>Language / Reo:</Text>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleLanguage}>
          <Text style={styles.toggleText}>
            {language === "te reo" ? "Te Reo Māori" : "English"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.label}>Reminders & Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? "#267f53" : "#ccc"}
          trackColor={{ true: "#99b7f5", false: "#ddd" }}
        />
      </View>

      {/* Privacy & consent */}
      <TouchableOpacity
        style={styles.linkCard}
        onPress={() => Alert.alert("Privacy Policy", "Privacy & data management options will appear here.")}
      >
        <Text style={styles.linkText}>Privacy & Data Consent</Text>
      </TouchableOpacity>

      {/* Help & feedback */}
      <TouchableOpacity
        style={styles.linkCard}
        onPress={() => Linking.openURL("mailto:info@keteofknowledge.co.nz")}
      >
        <Text style={styles.linkText}>Help & Feedback</Text>
      </TouchableOpacity>

      {/* About */}
      <View style={[styles.linkCard, { marginTop: 20 }]}>
        <Text style={[styles.linkText, { fontWeight: "600" }]}>About Kete of Knowledge</Text>
        <Text style={styles.aboutText}>
          He kaupapa Māori digital health resource by Manawaora.  
          Version 1.0.0 — built with aroha for whānau hauora.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  toggleButton: {
    backgroundColor: "#f6f6f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toggleText: {
    fontSize: 16,
    color: "#267f53",
    fontWeight: "600",
  },
  linkCard: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 14,
    marginVertical: 6,
  },
  linkText: {
    fontSize: 16,
    color: "#333",
  },
  aboutText: {
    fontSize: 14,
    marginTop: 6,
    color: "#555",
    lineHeight: 20,
  },
})
