import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileHomeScreen from "../../../features/profile/screens/ProfileHomeScreen"
import GoalsScreen from "../../../features/profile/screens/GoalsScreen"
import DataSettingsScreen from "../../../features/profile/screens/DataSettingsScreen"
import HealthProviderScreen from "../../../features/profile/screens/HealthProviderScreen"
import MyProviderScreen from "../../../features/profile/screens/MyProviderScreen"
import ProviderDetailScreen from "../../../features/profile/screens/ProviderDetailScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
      />

      <Stack.Screen
        name="Goals"
        component={GoalsScreen}
      />

      <Stack.Screen
        name="DataSettings"
        component={DataSettingsScreen}
      />

      <Stack.Screen
        name="HealthProviders"
        component={HealthProviderScreen}
      />

      <Stack.Screen
        name="MyProvider"
        component={MyProviderScreen}
      />

      <Stack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
      />
    </Stack.Navigator>
  )
}
