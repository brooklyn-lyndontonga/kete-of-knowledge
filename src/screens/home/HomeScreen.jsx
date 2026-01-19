 
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { API_URL } from "../../lib/api"
import { layout } from "../../ui/styles/layout"
import { Card, Text, Spacer } from "../../ui"

import WhakataukiCard from "./components/WhakataukiCard"
import QuickOverview from "./components/QuickOverview"

export default function HomeScreen({ navigation }) {
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
    <SafeAreaView style={layout.screen}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ alignItems: "center" }}>
        <Text variant="title">Kete of Knowledge 🌱</Text>
         </View>

        <Spacer size={32} />

        <Card>
          <WhakataukiCard />
        </Card>

         <Spacer size={32} />

        {summary && (
          <Card>
            <QuickOverview
              navigation={navigation}
              summary={summary}
            />
          </Card>
        )}

        <Spacer size={16} />
      </ScrollView>
    </SafeAreaView>
  )
}
