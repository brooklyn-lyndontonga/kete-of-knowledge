import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SettingsScreen from '../../screens/settings/SettingsScreen'
import AccessibilityScreen from '../../screens/settings/AccessibilityScreen'
import HelpScreen from '../../screens/settings/HelpScreen'
import SettingsPlaceholderScreen from '../../screens/settings/SettingsPlaceholderScreen'

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="AccessibilityScreen"
        component={AccessibilityScreen}
      />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen
        name="SettingsPlaceholderScreen"
        component={SettingsPlaceholderScreen}
      />
    </Stack.Navigator>
  )
}
