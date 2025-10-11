// src/navigation/stacks/HubStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HubPlaceholderScreen from "../../features/hub/screens/HubPlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HubPlaceholder"
        component={HubPlaceholderScreen}
        options={{ title: "Hub" }}
      />
    </Stack.Navigator>
  )
}
