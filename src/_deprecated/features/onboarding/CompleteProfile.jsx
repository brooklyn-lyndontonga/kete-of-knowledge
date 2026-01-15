import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useOnboarding } from '../../app/providers/OnboardingProvider'

export default function CompleteProfile() {
  const { completeOnboarding } = useOnboarding()
  const navigation = useNavigation()
  const [submitting, setSubmitting] = useState(false)

  const handleContinue = async () => {
    if (submitting) return
    setSubmitting(true)

    await completeOnboarding({
      name: '',
      focus: null,
      remindersEnabled: true,
    })

    navigation.navigate('Done')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Complete Profile</Text>
      <TouchableOpacity onPress={handleContinue}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}
