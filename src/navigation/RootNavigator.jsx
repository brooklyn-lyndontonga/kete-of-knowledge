/* src/navigation/RootNavigator.jsx */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"

import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"

import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
import EmailSignUp from "../features/onboarding/screens/EmailSignUp"
import PostSignInStack from "./PostSignInStack"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"
import LaunchScreen from "../features/welcome/screens/LaunchScreen"   // ✅ new

import { navigationRef } from "./navigationRef"

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
    <NavigationContainer ref={navigationRef}>
      {loading ? (
        // ----- Loading -----
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : !user ? (
        // ----- Guest flow -----
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerTitleAlign: "center",
          }}
        >
          {/* Landing appears first for guests */}
          <Stack.Screen
            name="Launch"
            component={LaunchScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="EmailSignIn"
            component={EmailSignIn}
            options={{ title: "Sign in" }}
          />
          <Stack.Screen
            name="EmailSignUp"
            component={EmailSignUp}
            options={{ title: "Sign up" }}
          />
          {/* Dev shortcut mounts the inner stack (it has its own headers) */}
          <Stack.Screen
            name="PostSignInDev"
            component={PostSignInStack}
            options={{ headerShown: false }}
          />
          {/* Keep AppTabs targetable for DevBypass */}
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : isFirstLogin ? (
        // ----- First login flow -----
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PostSignIn" component={PostSignInStack} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
          {/* Allow tabs just in case (dev bypass) */}
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
      ) : (
        // ----- Returning user flow -----
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Landing appears before tabs for signed-in users (but auto-skips after first view) */}
          <Stack.Screen name="Launch" component={LaunchScreen} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
