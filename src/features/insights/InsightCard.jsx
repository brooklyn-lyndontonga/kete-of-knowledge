/* eslint-disable react/prop-types */
import React from "react"
import { View, Text } from "react-native"

export default function InsightCard({ message }) {
  return (
    <View
      style={{
        padding: 14,
        marginVertical: 6,
        borderRadius: 12,
        backgroundColor: "#F1F5F3",
      }}
    >
      <Text style={{ fontSize: 15, color: "#2F3E37" }}>
        {message}
      </Text>
    </View>
  )
}
