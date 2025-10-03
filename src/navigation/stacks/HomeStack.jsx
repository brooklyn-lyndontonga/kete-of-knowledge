// src/navigation/stacks/HomeStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../../screens/home/HomeScreen"
import HomeWelcomeScreen from "../../screens/home/HomeWelcomeScreen" // remove if you don't have this yet

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeWelcome"
        component={HomeWelcomeScreen}
        options={{ title: "Welcome" }}
      />
    </Stack.Navigator>
  )
}
