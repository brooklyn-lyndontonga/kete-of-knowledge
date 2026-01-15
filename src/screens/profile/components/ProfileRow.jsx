/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"

export default function ProfileRow({ label, value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
      }}
    >
      <Text>{label}</Text>
      <Text style={{ color: "#555" }}>{value}</Text>
    </View>
  )
}
