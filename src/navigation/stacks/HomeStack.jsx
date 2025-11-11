import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/home/HomeScreen'
import HomeWelcomeScreen from '../../screens/home/HomeWelcomeScreen'
import ChecklistScreen from '../../screens/home/ChecklistScreen'
import AboutScreen from '../../screens/home/AboutScreen'
import RemindersScreen from '../../screens/home/RemindersScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeWelcomeScreen" component={HomeWelcomeScreen} />
      <Stack.Screen name="ChecklistScreen" component={ChecklistScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
    </Stack.Navigator>
  )
}
