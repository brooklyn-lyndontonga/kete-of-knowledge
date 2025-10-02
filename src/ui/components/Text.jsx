// src/ui/components/Text.jsx
import React from "react"
import { Text as RNText } from "react-native"
import { typography, colors } from "../../theme"

export default function Text({ children, style, variant = "body", ...rest }) {
  const base = {
    color: colors?.text ?? "#111827",
    fontFamily:
      variant === "heading"
        ? typography?.heading
        : variant === "bold"
        ? typography?.bold
        : typography?.body,
    fontSize: variant === "heading" ? 28 : 16,
    lineHeight: variant === "heading" ? 34 : 22,
  }

  return (
    <RNText style={[base, style]} {...rest}>
      {children}
    </RNText>
  )
}
