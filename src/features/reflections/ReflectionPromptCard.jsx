/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function ReflectionPromptCard({ prompt, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 16,
          marginVertical: 6,
          borderRadius: 12,
          backgroundColor: "#FFF6EC",
        }}
      >
        <Text style={{ fontSize: 15, color: "#4A3B2A" }}>
          {prompt}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "#8A6A4A",
          }}
        >
          Reflect →
        </Text>
      </View>
    </TouchableOpacity>
  )
}
