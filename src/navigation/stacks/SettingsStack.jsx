// src/navigation/stacks/SettingsStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsPlaceholderScreen from "../../features/settings/screens/SettingsPlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingsPlaceholder"
        component={SettingsPlaceholderScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  )
}
