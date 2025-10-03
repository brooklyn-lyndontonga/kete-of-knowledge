import React from "react"
import { View, ActivityIndicator, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useAuth } from "../app/providers/AuthProvider"
import { useOnboarding } from "../app/providers/OnboardingProvider"
import { navigationRef } from "./navigationRef"

// root-level screens
import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../features/onboarding/screens/EmailSignIn"
import EmailSignUp from "../features/onboarding/screens/EmailSignUp"
import LaunchScreen from "../features/welcome/screens/LaunchScreen"
import WelcomeBackScreen from "../features/welcome/screens/WelcomeBackScreen"

// nested onboarding stack (first-time flow)
import PostSignInStack from "./PostSignInStack"

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Loading…</Text>
    </View>
  )
}

export default function RootNavigator() {
  const { user, loading } = useAuth()
  const { isFirstLogin } = useOnboarding()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => console.log("Navigation is ready")}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          // Loading branch
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : !user ? (
          // Guest branch
          <>
            <Stack.Screen name="Launch" component={LaunchScreen} />
            <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
            <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
            {/* Dev: preview onboarding stack without auth */}
            <Stack.Screen name="PostSignInDev" component={PostSignInStack} />
          </>
        ) : isFirstLogin ? (
          // First login → onboarding flow
          <>
            <Stack.Screen name="PostSignIn" component={PostSignInStack} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
          </>
        ) : (
          // Returning user
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
