/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* src/navigation/RootNavigator.jsx */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"

import { useAuth } from "../context/AuthContext"
import { useOnboarding } from "../context/OnboardingContext"

import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../onboarding/EmailSignIn"
import PostSignInStack from "./PostSignInStack" 
import WelcomeBackScreen from "../screens/welcome/WelcomeBackScreen"

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Loading…</Text>
    </View>
  )
}

function RootNavigator() {
  const { user, loading } = useAuth()
  const { isFirstLogin } = useOnboarding()

  if (loading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // Guest (no user yet)
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // Signed in, decide if it’s first login
  if (isFirstLogin) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PostSignIn" component={PostSignInStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // Returning user → dashboard
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator