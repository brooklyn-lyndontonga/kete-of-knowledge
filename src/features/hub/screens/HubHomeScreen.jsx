/* eslint-disable no-unused-vars */
import React from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import TileGrid from "../../../ui/components/TileGrid"
import Header from "../../../ui/components/Header"
import { useNavigation } from "@react-navigation/native"

export default function HubHomeScreen() {
  const navigation = useNavigation()

  const hubTiles = [
    {
      title: "Ngā Mate me Ngā Tūraru – Conditions & Risk Factors",
      route: "ConditionList",
      icon: "❤️",
    },
    {
      title: "Ngā Tohu – Symptoms Tracker",
      route: "SymptomTracker",
      icon: "🩺",
    },
    {
      title: "Whakahaere i ō Mate – Managing My Conditions",
      route: "ManageConditions",
      icon: "🌿",
    },
    {
      title: "Ngā Rongoā – Medicines & Rongoā",
      route: "MedicinesList",
      icon: "💊",
    },
    {
      title: "Kai ā Nuku – Nutrition",
      route: "Nutrition",
      icon: "🥗",
    },
    {
      title: "Nekeneke – Movement & Hauora",
      route: "Movement",
      icon: "🏃🏽‍♀️",
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <Header
        title="Tāku Manawa"
        subtitle="My Heart Health Hub"
      />

      <Text style={styles.intro}>
        Nau mai ki Tāku Manawa — your space to learn, reflect, and take care of
        your hauora manawa.
      </Text>

      <TileGrid
        items={hubTiles.map((item) => ({
          title: item.title,
          icon: item.icon,
          onPress: () => navigation.navigate(item.route),
        }))}
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
  intro: {
    marginVertical: 12,
    fontSize: 16,
    color: "#444",
  },
})
