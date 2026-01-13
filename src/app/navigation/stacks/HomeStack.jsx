import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useOnboarding } from '../../providers/OnboardingProvider'

// Screens (features only)
import HomeWelcomeScreen from '../../../features/home/HomeWelcomeScreen'
import HomeScreen from '../../../features/home/HomeScreen02'
import WriteReflectionScreen from '../../../features/hub/WriteReflectionScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  const { hasSeenHomeWelcome } = useOnboarding()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenHomeWelcome && (
        <Stack.Screen name="HomeWelcome" component={HomeWelcomeScreen} />
      )}

      <Stack.Screen name="HomeMain" component={HomeScreen} />

      <Stack.Screen name="WriteReflection" component={WriteReflectionScreen} />
    </Stack.Navigator>
  )
}
