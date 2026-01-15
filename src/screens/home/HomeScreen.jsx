/* eslint-disable react/prop-types */
import React from "react"
import { ScrollView, View, Text } from "react-native"

import WhakataukiCard from "./components/WhakataukiCard"
import QuickStats from "./components/QuickStats"
import QuickActions from "./components/QuickActions"

export default function HomeScreen({ navigation }) {
  console.log("🏠 HomeScreen rendered")

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Nau mai 🌿
      </Text>

      <WhakataukiCard />

      <View style={{ marginTop: 24 }}>
        <QuickStats />
      </View>

      <View style={{ marginTop: 24 }}>
        <QuickActions navigation={navigation} />
      </View>
    </ScrollView>
  )
}
