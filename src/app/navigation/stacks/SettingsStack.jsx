import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SettingsScreen from "../../../features/settings/SettingsScreen"

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  )
}
