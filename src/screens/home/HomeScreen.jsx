/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { ScrollView, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { API_URL } from "../../lib/api"

import WhakataukiCard from "./components/WhakataukiCard"
import QuickOverview from "./components/QuickOverview"
import QuickActions from "./components/QuickActions"

export default function HomeScreen({ navigation }) {
  console.log("🏠 HomeScreen rendered")

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetchHomeSummary()
  }, [])

  async function fetchHomeSummary() {
    try {
      const res = await fetch(`${API_URL}/home/summary`)
      const data = await res.json()
      setSummary(data)
    } catch (err) {
      console.warn("Failed to load home summary", err)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 32,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 16 }}>
          Kete of Knowledge Dashboard 🌱
        </Text>

        <WhakataukiCard />

        {summary && (
          <View style={{ marginTop: 24 }}>
            <QuickOverview
              navigation={navigation}
              summary={summary}
            />
          </View>
        )}

        <View style={{ marginTop: 24 }}>
          <QuickActions navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
