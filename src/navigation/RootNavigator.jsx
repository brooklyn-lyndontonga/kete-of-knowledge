/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react"
import { View, ActivityIndicator, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigationRef"
import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"

// Stacks and screens
import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
import EmailSignUp from "../features/onboarding/screens/EmailSignUp"
import LaunchScreen from "../features/welcome/screens/LaunchScreen"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"
import PostSignInStack from "./PostSignInStack"

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* ✅ Always register all major stacks */}
        <Stack.Screen name="Launch" component={LaunchScreen} />
        <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="PostSignIn" component={PostSignInStack} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />

        {/* 👩‍💻 Dev-only route for bypass navigation */}
        {__DEV__ && (
          <Stack.Screen
            name="PostSignInDev"
            component={PostSignInStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
