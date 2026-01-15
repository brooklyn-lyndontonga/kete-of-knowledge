 
/* eslint-disable react/prop-types */
import React from "react"
import { ScrollView, View } from "react-native"

import WhakataukiCard from "./components/WhakataukiCard"
import QuickStats from "./components/QuickStats"
import QuickActions from "./components/QuickActions"

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Daily grounding */}
      <WhakataukiCard />

      {/* Today snapshot */}
      <View style={{ marginTop: 24 }}>
        <QuickStats />
      </View>

      {/* Entry points */}
      <View style={{ marginTop: 24 }}>
        <QuickActions navigation={navigation} />
      </View>
    </ScrollView>
  )
}
