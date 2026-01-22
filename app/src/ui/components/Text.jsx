/* eslint-disable react/prop-types */
import React from "react"
import { Text as RNText } from "react-native"
import { textStyles } from "../styles/text"

export default function Text({
  variant = "body",
  style,
  children,
  ...props
}) {
  return (
    <RNText style={[textStyles[variant], style]} {...props}>
      {children}
    </RNText>
  )
}
