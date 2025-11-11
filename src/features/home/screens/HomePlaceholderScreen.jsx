/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import Header from "../../../ui/components/Header"
import TileGrid from "../../../ui/components/TileGrid"
import ProgressCard from "../../../ui/components/ProgressCard"
import WhakataukiCard from "../../../ui/components/WhakataukiCard"
import { useNavigation } from "@react-navigation/native"

export default function HomeScreen() {
  const navigation = useNavigation()
  const [whakatauki, setWhakatauki] = useState("")

  // Example: load a random whakataukī from JSON
  useEffect(() => {
    import("../../../data/whakatauki.json").then((data) => {
      const random = data.default[Math.floor(Math.random() * data.default.length)]
      setWhakatauki(random?.text || "")
    })
  }, [])

  const quickActions = [
    { title: "Log Symptoms", route: "SymptomTracker", icon: "💊" },
    { title: "My Medicines", route: "MedicinesList", icon: "🌿" },
    { title: "Reminders", route: "Profile", icon: "⏰" },
  ]

  return (
    <ScrollView style={styles.container}>
      <Header
        title="Kia ora, Brooklyn!"
        subtitle={whakatauki}
      />

      {/* Quick-action tiles */}
      <TileGrid
        items={quickActions.map((item) => ({
          title: item.title,
          icon: item.icon,
          onPress: () => navigation.navigate(item.route),
        }))}
      />

      {/* Progress snapshot */}
      <ProgressCard
        title="My Hauora Journey"
        progress={0.6}
        subtitle="Ka pai! You’re keeping consistent this week."
      />

      {/* Whānau reflection / story */}
      <WhakataukiCard
        text="He oranga ngākau, he pikinga waiora — A healthy heart lifts the spirit."
        author="— Ngā kōrero tuku iho"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
})
