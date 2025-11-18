import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../../../features/home/screens/HomeScreen"
import ChecklistScreen from "../../../features/home/screens/ChecklistScreen"
import HomeWelcomeScreen from "../../../features/home/screens/HomeWelcomeScreen"
import ReflectionTile from "../../../features/home/screens/ReflectionTile"
import ReminderScreen from "../../../features/home/screens/ReminderScreen"
import ProgressSnapshot from "../../../features/home/screens/ProgressSnapshot"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomeWelcome" component={HomeWelcomeScreen} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} />
      <Stack.Screen name="Reflection" component={ReflectionTile} />
      <Stack.Screen name="Reminder" component={ReminderScreen} />
      <Stack.Screen name="ProgressSnapshot" component={ProgressSnapshot} />
    </Stack.Navigator>
  )
}
