import React from "react"
import { View, Text } from "react-native"
import { useContext } from "react"
import { AppDataContext } from "../../../context/AppDataContext"

export default function ProfileHeader() {
  const { profile } = useContext(AppDataContext)

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "600" }}> {profile?.name || "My Profile"} </Text>

      <Text style={{ marginTop: 8, color: "#555" }}>
        This kete belongs to you. It holds your health journey,
        reflections, and intentions.
      </Text>
    </View>
  )
}
