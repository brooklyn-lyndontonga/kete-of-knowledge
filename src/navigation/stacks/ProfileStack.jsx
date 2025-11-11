import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../../screens/profile/ProfileScreen'
import ProfileGuidelinesScreen from '../../screens/profile/ProfileGuidelinesScreen'
import ProfilePlaceholderScreen from '../../screens/profile/ProfilePlaceholderScreen'
import ProfilesScreen from '../../screens/profile/ProfilesScreen'

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileGuidelinesScreen"
        component={ProfileGuidelinesScreen}
      />
      <Stack.Screen
        name="ProfilePlaceholderScreen"
        component={ProfilePlaceholderScreen}
      />
      <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
    </Stack.Navigator>
  )
}
