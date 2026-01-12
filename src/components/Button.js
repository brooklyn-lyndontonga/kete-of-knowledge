/* eslint-disable react/prop-types */
import React from "react"
import { Pressable, Text, StyleSheet } from "react-native"
import { colors, spacing, radius, typography } from "../theme/theme"

export default function Button({
  title,
  onPress,
  variant = "primary",
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    alignItems: "center",
  },

  pressed: {
    opacity: 0.85,
  },

  primary: {
    backgroundColor: colors.ink,
  },

  secondary: {
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: "transparent",
  },

  text: {
    fontSize: typography.body,
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: colors.ink,
  },
})
