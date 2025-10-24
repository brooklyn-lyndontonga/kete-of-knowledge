import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { useTheme } from '../../theme'

export function ProfileCard({ profile, setProfile }) {
  const { colors, spacing, typography } = useTheme()

  const handleChange = (field, value) => setProfile({ ...profile, [field]: value })

  return (
    <View style={{
      backgroundColor: colors.card,
      padding: spacing.md,
      borderRadius: spacing.sm,
      marginBottom: spacing.lg,
    }}>
      <Text style={{ ...typography.h3, color: colors.textPrimary, marginBottom: spacing.sm }}>
        Basic Details
      </Text>

      {['name', 'age', 'gender'].map(field => (
        <View key={field} style={{ marginBottom: spacing.sm }}>
          <Text style={{ color: colors.textSecondary, marginBottom: 4 }}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Text>
          <TextInput
            value={profile[field]}
            onChangeText={(v) => handleChange(field, v)}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: spacing.xs,
              padding: spacing.sm,
              color: colors.textPrimary,
            }}
            placeholder={`Enter your ${field}`}
            placeholderTextColor={colors.textPlaceholder}
          />
        </View>
      ))}
    </View>
  )
}
