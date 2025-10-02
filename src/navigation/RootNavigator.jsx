import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"

import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"

import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
import PostSignInStack from "./PostSignInStack"
import LaunchScreen from "../features/welcome/screens/LaunchScreen"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"

const Stack = createNativeStackNavigator()

function Loading() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
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
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      ) : !user ? (
        // Guest flow: Launch → (EmailSignIn) → Tabs
        <Stack.Navigator initialRouteName="Launch">
          <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSignIn" component={EmailSignIn} options={{ title: "Continue with email" }} />
          <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
          {/* Dev: preview onboarding without auth */}
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : isFirstLogin ? (
        // First-time user → onboarding stack
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PostSignIn" component={PostSignInStack} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
      ) : (
        // Returning user → tabs (plus optional welcome back)
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
