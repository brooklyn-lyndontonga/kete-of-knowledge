/* eslint-disable react/prop-types */
import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import Card from '../../../components/Card'
import { colors, spacing, typography } from '../../../theme/theme'

export default function ConditionCard({
  title,
  description,
  onPress,
  status, // "success" | "warning"
}) {
  return (
    <Pressable onPress={onPress}>
      <Card tone={status}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.h2,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.small,
    color: colors.muted,
    lineHeight: 20,
  },
})
