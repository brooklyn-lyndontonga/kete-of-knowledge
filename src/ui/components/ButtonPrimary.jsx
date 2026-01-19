/* eslint-disable react/prop-types */
import React from "react"
import { Pressable } from "react-native"
import Text from "./Text"
import { buttons } from "../styles/buttons"

export default function ButtonPrimary({ label, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        buttons.primary,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Text style={{ color: "white" }}>{label}</Text>
    </Pressable>
  )
}
