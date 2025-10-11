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
        {loading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : !user ? (
          <>
            <Stack.Screen name="Launch" component={LaunchScreen} />
            <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
            <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
          </>
        ) : isFirstLogin ? (
          <>
            <Stack.Screen name="PostSignIn" component={PostSignInStack} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
          </>
        ) : (
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
