// src/navigation/stacks/LibraryStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryPlaceholderScreen from "../../features/library/screens/LibraryPlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibraryPlaceholder"
        component={LibraryPlaceholderScreen}
        options={{ title: "Library" }}
      />
    </Stack.Navigator>
  )
}
