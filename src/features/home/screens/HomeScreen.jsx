import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import WhakataukiCard from "./WhakataukiCard"
import QuickActionCard from "./QuickActionCard"
import ProgressSnapshot from "./ProgressSnapshot"
import ReflectionTile from "./ReflectionTile"

export default function HomeScreen() {
  const navigation = useNavigation()
  const [userName] = useState("Brooky") // will pull from AuthContext later

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Kia ora, {userName}!</Text>
        <WhakataukiCard />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.cardRow}>
          <QuickActionCard
            title="Log Symptoms"
            emoji="📋"
            onPress={() => navigation.navigate("Symptoms")}
          />
          <QuickActionCard
            title="Update Medicines"
            emoji="💊"
            onPress={() => navigation.navigate("MyMedicines")}
          />
        </View>
        <QuickActionCard
          title="View Reminders"
          emoji="⏰"
          onPress={() => navigation.navigate("Reminders")}
        />
      </View>

      {/* Progress Snapshot */}
      <ProgressSnapshot />

      {/*  Reflection */}
      <ReflectionTile />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Hub")}>
          <Text style={styles.footerLink}>Tāku Manawa (Hub)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Library")}>
          <Text style={styles.footerLink}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.footerLink}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 26, fontWeight: "700", color: "#2E2E2E" },
  quickActions: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerLink: { color: "#267f53", fontWeight: "600" },
})
