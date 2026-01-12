/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { typography, spacing, colors } from "../../theme/theme"

export default function Section({ title, children }) {
  return (
    <View style={styles.section}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.h2,
    color: colors.ink,
    marginBottom: spacing.md,
  },
})

