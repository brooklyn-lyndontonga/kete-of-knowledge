// src/navigation/stacks/ProfileStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfilePlaceholderScreen from "../../features/profile/screens/ProfilePlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfilePlaceholder"
        component={ProfilePlaceholderScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  )
}
