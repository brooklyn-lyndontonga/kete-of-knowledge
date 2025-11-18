import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../../features/profile/screens/ProfileScreen"
import GoalsScreen from "../../../features/profile/screens/GoalsScreen"
import DataSettingsScreen from "../../../features/profile/screens/DataSettingsScreen"
import HealthProviderScreen from "../../../features/profile/screens/HealthProviderScreen"
import ProfilePlaceholderScreen from "../../../features/profile/screens/ProfilePlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="DataSettings" component={DataSettingsScreen} />
      <Stack.Screen name="HealthProvider" component={HealthProviderScreen} />
      <Stack.Screen name="ProfilePlaceholder" component={ProfilePlaceholderScreen} />
    </Stack.Navigator>
  )
}
