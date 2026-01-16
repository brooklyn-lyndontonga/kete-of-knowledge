import React from "react"
import { View, Text } from "react-native"
import { useAppData } from "../../../hooks/useAppData"

export default function ProfileHeader() {
  console.log("👤 ProfileHeader rendered")

  const { profile } = useAppData()

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontSize: 14, color: "#666" }}>Identity</Text>

      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 4 }}>
        {profile?.name || "This kete"}
      </Text>
    </View>
  )
}
