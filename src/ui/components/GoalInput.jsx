import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { useTheme } from '../../theme'

export function GoalInput({ profile, setProfile }) {
  const { colors, spacing, typography } = useTheme()

  return (
    <View style={{
      backgroundColor: colors.card,
      padding: spacing.md,
      borderRadius: spacing.sm,
    }}>
      <Text style={{ ...typography.h3, color: colors.textPrimary, marginBottom: spacing.sm }}>
        Your Goals
      </Text>
      <TextInput
        multiline
        value={profile.goals}
        onChangeText={(v) => setProfile({ ...profile, goals: v })}
        placeholder="Describe your health or wellbeing goals..."
        placeholderTextColor={colors.textPlaceholder}
        style={{
          height: 100,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: spacing.xs,
          padding: spacing.sm,
          color: colors.textPrimary,
          textAlignVertical: 'top'
        }}
      />
    </View>
  )
}
