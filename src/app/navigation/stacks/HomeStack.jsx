import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../../../features/home/screens/HomeScreen"
import ChecklistScreen from "../../../features/home/screens/ChecklistScreen"
import HomeWelcomeScreen from "../../../features/home/screens/HomeWelcomeScreen"
import ReflectionTileScreen from "../../../features/home/screens/ReflectionTileScreen"
import RemindersScreen from "../../../features/home/screens/RemindersScreen"
import ProgressSnapshotScreen from "../../../features/home/screens/ProgressSnapshotScreen"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomeWelcome" component={HomeWelcomeScreen} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} />
      <Stack.Screen name="Reflection" component={ReflectionTileScreen} />
      <Stack.Screen name="Reminders" component={RemindersScreen} />
      <Stack.Screen name="ProgressSnapshot" component={ProgressSnapshotScreen} />
    </Stack.Navigator>
  )
}
