/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Card from '../../components/Card'
import { colors, spacing, typography } from '../../theme/theme'

export default function InsightCard({
  message,
  tone, // "success" | "warning" | undefined
}) {
  return (
    <Card tone={tone}>
      <Text style={styles.text}>{message}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: typography.body,
    color: colors.ink,
    lineHeight: 22,
  },
})
