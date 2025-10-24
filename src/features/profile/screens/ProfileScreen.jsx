import React, { useState } from 'react'
import { ScrollView, View, Text, Button, Alert } from 'react-native'
import { ProfileCard } from '../../../ui/components/ProfileCard'
import { GoalInput } from '../../../ui/components/GoalInput'
import { useTheme } from '../../../theme'

export default function ProfileScreen() {
  const { colors, spacing, typography } = useTheme()
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    goals: ''
  })

  const handleSave = () => {
    if (!profile.name || !profile.age || !profile.gender || !profile.goals) {
      Alert.alert('Missing info', 'All fields are required.')
      return
    }
    console.log('Profile saved:', profile)
    Alert.alert('Success', 'Profile saved locally!')
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      <Text style={{ ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md }}>
        Your Profile
      </Text>

      <ProfileCard profile={profile} setProfile={setProfile} />
      <GoalInput profile={profile} setProfile={setProfile} />

      <View style={{ marginTop: spacing.lg }}>
        <Button title="Save Profile" onPress={handleSave} />
      </View>
    </ScrollView>
  )
}
