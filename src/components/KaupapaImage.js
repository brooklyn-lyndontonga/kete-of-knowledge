/* eslint-disable react/prop-types */
import React from "react"
import { Image, StyleSheet } from "react-native"
import { radius } from "../theme/theme"

export default function KaupapaImage({ source, style }) {
  return (
    <Image
      source={source}
      style={[styles.image, style]}
      resizeMode="cover"
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: radius.lg,
  },
})
