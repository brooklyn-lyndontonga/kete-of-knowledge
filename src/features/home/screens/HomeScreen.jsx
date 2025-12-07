/* eslint-disable no-unused-vars */
import React from "react"
import { View, ScrollView } from "react-native"
import { useWhakatauki } from "../../../hooks/useWhakatauki"
import WhakataukiCard from "../components/WhakataukiCard"
import ProgressSnapshotCard from "../components/ProgressSnapshotCard"
import ReflectionTileCard from "../components/ReflectionTileCard"

export default function HomeScreen() {
  const { whakatauki, loading } = useWhakatauki()

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <ProgressSnapshotCard />
      <ReflectionTileCard />

      {!loading && whakatauki && (
        <WhakataukiCard
          text={whakatauki.text}
          translation={whakatauki.translation}
        />
      )}
    </ScrollView>
  )
}
