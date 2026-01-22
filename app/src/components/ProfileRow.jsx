/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"

export default function ProfileRow({ label, value }) {
  return (
    <View
      style={{
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 14, color: "#666" }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{value}</Text>
    </View>
  )
}
