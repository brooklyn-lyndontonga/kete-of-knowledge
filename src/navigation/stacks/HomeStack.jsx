// src/navigation/stacks/HomeStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomePlaceholderScreen from "../../features/home/screens/HomePlaceholderScreen"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePlaceholder" component={HomePlaceholderScreen} />
    </Stack.Navigator>
  )
}
