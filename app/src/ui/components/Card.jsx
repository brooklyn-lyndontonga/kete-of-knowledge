/* eslint-disable react/prop-types */
import React from "react"
import { View } from "react-native"
import { cards } from "../styles/cards"

export default function Card({ soft = false, style, children }) {
  return (
    <View style={[cards.card, soft && cards.soft, style]}>
      {children}
    </View>
  )
}
