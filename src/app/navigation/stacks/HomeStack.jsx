import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useOnboarding } from "../../providers/OnboardingProvider"

import HomeWelcomeScreen from "../../../features/home/screens/HomeWelcomeScreen"
import HomeScreen from "../../../features/home/screens/HomeScreen"
import WriteReflectionScreen from "../../../features/hub/screens/WriteReflectionScreen"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  const { hasSeenHomeWelcome } = useOnboarding()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenHomeWelcome && (
        <Stack.Screen
          name="HomeWelcome"
          component={HomeWelcomeScreen}
        />
      )}

      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
      />

      <Stack.Screen
        name="WriteReflection"
        component={WriteReflectionScreen}
      />
    </Stack.Navigator>
  )
}
