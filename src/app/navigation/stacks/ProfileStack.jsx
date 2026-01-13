import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import ProfileHomeScreen from '../../../features/profile/ProfileHomeScreen'
import GoalsScreen from '../../../features/profile/GoalsScreen'
import DataSettingsScreen from '../../../features/profile/DataSettingsScreen'
import HealthProviderScreen from '../../../features/profile/HealthProviderScreen'
import MyProviderScreen from '../../../features/profile/MyProviderScreen'
import ProviderDetailScreen from '../../../features/profile/ProviderDetailScreen'

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />

      <Stack.Screen name="ProfileGoals" component={GoalsScreen} />

      <Stack.Screen name="ProfileDataSettings" component={DataSettingsScreen} />

      <Stack.Screen
        name="ProfileHealthProviders"
        component={HealthProviderScreen}
      />

      <Stack.Screen name="ProfileMyProvider" component={MyProviderScreen} />

      <Stack.Screen
        name="ProfileProviderDetail"
        component={ProviderDetailScreen}
      />
    </Stack.Navigator>
  )
}
