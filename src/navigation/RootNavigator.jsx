/* src/navigation/RootNavigator.jsx */
import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"

import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
// If you fully unified entry, you can remove EmailSignUp entirely:
// import EmailSignUp from "../features/onboarding/screens/EmailSignUp"
import PostSignInStack from "./PostSignInStack"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"
import LaunchScreen from "../features/welcome/screens/LaunchScreen"

import { navigationRef } from "./navigationRef"

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 12 }}>Loading…</Text>
    </View>
  )
}

export default function RootNavigator() {
  const { user, loading } = useAuth()
  const { isFirstLogin } = useOnboarding()

  if (loading) {
    // Dedicated component avoids inline-function warnings
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? (
        // ---------- GUEST FLOW ----------
        <Stack.Navigator
          initialRouteName="Launch"
          screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
        >
          <Stack.Screen
            name="Launch"
            component={LaunchScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="EmailSignIn"
            component={EmailSignIn}
            options={{ title: "Continue with email" }}
          />
          {/* If you’ve removed EmailSignUp, delete this screen */}
          {/* <Stack.Screen
            name="EmailSignUp"
            component={EmailSignUp}
            options={{ title: "Sign up" }}
          /> */}
          {/* Keep these registered so DevBypass can always target them */}
          <Stack.Screen
            name="PostSignInDev"
            component={PostSignInStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : isFirstLogin ? (
        // ---------- FIRST LOGIN (POST-AUTH ONBOARDING) ----------
        <Stack.Navigator
          initialRouteName="PostSignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="PostSignIn" component={PostSignInStack} />
          {/* Registered for DevBypass convenience */}
          <Stack.Screen name="Launch" component={LaunchScreen} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
      ) : (
        // ---------- RETURNING USER FLOW ----------
        <Stack.Navigator
          initialRouteName="AppTabs"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="Launch" component={LaunchScreen} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
