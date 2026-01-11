import React from "react"
import { View, ActivityIndicator, Text } from "react-native"
import { useWhakatauki } from "../hooks/useWhakatauki"
import { useSnapshots } from "../hooks/useSnapshots"

import WhakataukiCard from "../../components/WhakataukiCard"
import ProgressSnapshotCard from "./components/ProgressSnapshotCard"

export default function HomeScreen() {
  const { whakatauki, loading: loadingQuote } = useWhakatauki({ mode: "daily" })
  const { snapshots, loading: loadingSnapshots, error } = useSnapshots()

  if (loadingQuote || loadingSnapshots) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  const latestSnapshot = snapshots[0] || null

  return (
    <View style={{ padding: 16 }}>
      <WhakataukiCard quote={whakatauki} />
      <ProgressSnapshotCard snapshot={latestSnapshot} />
    </View>
  )
}
