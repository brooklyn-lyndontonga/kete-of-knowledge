import React from "react"
import { View, ActivityIndicator, Text } from "react-native"
import { useWhakatauki } from "../hooks/useWhakatauki"
import WhakataukiCard from "../../components/WhakataukiCard"

export default function HomeScreen() {
  const { whakatauki, loading, error } = useWhakatauki({
    mode: "daily",
  })

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ padding: 16 }}>
      <WhakataukiCard quote={whakatauki} />
    </View>
  )
}
