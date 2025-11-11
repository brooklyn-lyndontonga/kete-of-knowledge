/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../../../ui/components/Header"
import GoalCard from "../components/GoalCard"
import ProgressCard from "../../../ui/components/ProgressCard"

export default function ProfileScreen() {
  const navigation = useNavigation()
  const [profile, setProfile] = useState({
    name: "Brooklyn",
    age: 29,
    gender: "Wāhine",
    provider: "Tūranga Health Clinic",
  })

  const goals = [
    { id: 1, text: "Hīkoi 3 times a week", progress: 0.8 },
    { id: 2, text: "Drink more wai māori", progress: 0.6 },
  ]

  return (
    <ScrollView style={styles.container}>
      <Header title="Tōku Kōtaha" subtitle="My Profile" />

      {/* Profile card */}
      <View style={styles.profileCard}>
        <Image
          source={require("../../../../assets/avatar-placeholder.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.details}>{`${profile.age} • ${profile.gender}`}</Text>
        <Text style={styles.provider}>{profile.provider}</Text>
      </View>

      {/* Goals Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Goals</Text>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GoalsScreen")}
        >
          <Text style={styles.buttonText}>View All Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Snapshot */}
      <ProgressCard
        title="Hauora Journey"
        progress={0.7}
        subtitle="Ka mau te wehi! Keep going strong."
      />

      {/* Sub-navigation options */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => navigation.navigate("HealthProviderScreen")}
        >
          <Text style={styles.linkText}>My Health Provider Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => navigation.navigate("DataSettingsScreen")}
        >
          <Text style={styles.linkText}>Data & Privacy Settings</Text>
        </TouchableOpacity>
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
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  details: {
    color: "#666",
  },
  provider: {
    color: "#267f53",
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#267f53",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  linkCard: {
    backgroundColor: "#f6f6f6",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#333",
  },
})
