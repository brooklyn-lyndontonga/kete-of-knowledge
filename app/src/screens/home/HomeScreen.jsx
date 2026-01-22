/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { ScrollView, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { layout } from "../../ui/styles/layout"
import { Card, Spacer } from "../../ui"
import bgImage from "../../assets/images/manuka.png"
import ScreenHeader from "../../ui/components/ScreenHeader"

import { API_URL } from "../../lib/api"

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
   <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="Kete of Knowledge Dashboard" />

        {/* Content is padded */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Spacer size={32} />

      <Card>
        <WhakataukiCard />
      </Card>

      <Spacer size={32} />

      {summary && (
        <Card>
          <QuickOverview navigation={navigation} summary={summary} />
        </Card>
      )}
    </ScrollView>
  </SafeAreaView>
</ImageBackground>
  )
}
