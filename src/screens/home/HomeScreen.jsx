/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { ScrollView, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import WhakataukiCard from "./components/WhakataukiCard"

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      
      {/* Daily Whakataukī */}
      <WhakataukiCard />

      {/* Summary row */}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <View style={cardSmall}>
          <Text style={label}>Latest symptom</Text>
          <Text style={value}>—</Text>
        </View>

        <View style={cardSmall}>
          <Text style={label}>Today</Text>
          <Text style={value}>No reminders</Text>
        </View>
      </View>

      {/* Log something */}
      <View style={[cardLarge, { marginTop: 16 }]}>
        <Text style={label}>Log something</Text>
        <Text style={value}>Symptom • Note • Checklist</Text>
      </View>

      {/* Checklist */}
      <View style={[cardLarge, { marginTop: 16 }]}>
        <Text style={label}>Checklist</Text>
        <Text style={value}>Nothing due today 🌿</Text>
      </View>

    </ScrollView>
    </SafeAreaView>
  )
}

const cardSmall = {
  flex: 1,
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#F5F5F5",
}

const cardLarge = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#F5F5F5",
}

const label = {
  fontSize: 12,
  color: "#666",
}

const value = {
  fontSize: 16,
  marginTop: 4,
}
