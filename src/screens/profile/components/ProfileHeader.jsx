import React from "react"
import { View, Text } from "react-native"
import { useAppData } from "../../app/providers/AppDataProvider"

export default function ProfileHeader() {
  console.log("👤 ProfileHeader rendered")

  const { profile } = useAppData() || {}

  return (
    <View style={{ padding: 16, backgroundColor: "#F5F5F5", borderRadius: 12 }}>
      <Text style={{ fontSize: 14, color: "#666" }}>Identity</Text>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {profile?.name || "This kete"}
      </Text>
    </View>
  )
}
