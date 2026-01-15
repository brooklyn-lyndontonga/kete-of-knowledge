/* eslint-disable react/prop-types */
import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import Card from '../../../components/Card'
import { colors, spacing, typography } from '../../../theme/theme'

export default function ResourceCard({
  title,
  summary,
  onPress,
  featured = false,
}) {
  return (
    <Pressable onPress={onPress}>
      <Card tone={featured ? 'accent' : undefined}>
        <Text style={styles.title}>{title}</Text>
        {summary && <Text style={styles.summary}>{summary}</Text>}
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
  summary: {
    fontSize: typography.small,
    color: colors.muted,
    lineHeight: 20,
  },
})
