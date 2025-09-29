/* src/navigation/RootNavigator.jsx */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"

import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"

import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
import PostSignInStack from "./PostSignInStack"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Loading…</Text>
    </View>
  )
}

export default function RootNavigator() {
  const { user, loading } = useAuth()
  const { isFirstLogin } = useOnboarding()

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : !user ? (
        // Guest flow
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
          {/* dev shortcut to onboarding */}
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      ) : isFirstLogin ? (
        // First login flow
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PostSignIn" component={PostSignInStack} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      ) : (
        // Returning user flow
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
