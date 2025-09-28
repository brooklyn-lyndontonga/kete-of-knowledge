/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* src/navigation/RootNavigator.jsx */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"
import { useAuth } from "../context/AuthContext"
import { useOnboarding } from "../context/OnboardingContext"

// Screens / stacks
import AppTabs from "./tabs/AppTabs"
import EmailSignIn from "../onboarding/EmailSignIn"
import PostSignInStack from "./PostSignInStack" // contains PostSignInWelcome / Consent / Profile / Done

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
  const { consentAccepted } = useOnboarding()

  // 1) still determining auth
  if (loading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 2) signed-in but hasn't accepted consent / finished onboarding (real flow)
  //    we show post-signin stack (consent/profile) before unlocking the app
  if (user && !consentAccepted) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PostSignIn" component={PostSignInStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 3) default: show app tabs for everyone (guests see restricted placeholders; signed-in users see full features)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
        {/* keep EmailSignIn reachable from restricted screens */}
        <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
        {/* allow dev navigation directly to PostSignIn stack for dev-only iteration */}
        <Stack.Screen name="PostSignInDev" component={PostSignInStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator