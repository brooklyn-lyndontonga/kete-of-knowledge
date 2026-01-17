/* eslint-disable react/prop-types */
import React from "react"
import { ScrollView, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import WhakataukiCard from "./components/WhakataukiCard"
import QuickStats from "./components/QuickStats"
import QuickActions from "./components/QuickActions"

export default function HomeScreen({ navigation }) {
  console.log("🏠 HomeScreen rendered")

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 32, // avoids notch
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Home is alive 🌱
      </Text>

      <WhakataukiCard />

      <View style={{ marginTop: 24 }}>
        <QuickStats />
      </View>

      <View style={{ marginTop: 24 }}>
        <QuickActions navigation={navigation} />
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}
