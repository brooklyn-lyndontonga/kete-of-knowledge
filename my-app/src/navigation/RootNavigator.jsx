/* eslint-disable unused-imports/no-unused-imports */
// src/navigation/RootNavigator.jsx
/* eslint-disable unused-imports/no-unused-vars */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, ActivityIndicator } from "react-native"
import { useAuth } from "../context/AuthContext"
import { useOnboarding } from "../context/OnboardingContext"

// Screens
import EmailSignIn from "../onboarding/EmailSignIn"
import ConsentScreen from "../onboarding/ConsentScreen"
import AppTabs from "./tabs/AppTabs"
import PostSignInWelcome from "../onboarding/PostSignInWelcome"
import CompleteProfile from "../onboarding/CompleteProfile"

const Stack = createNativeStackNavigator()

function PostSignInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostSignInWelcome" component={PostSignInWelcome} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
    </Stack.Navigator>
  )
}

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
  const { consentAccepted } = useOnboarding()

  // ⏳ Checking session
  if (loading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 👤 Signed-in but not finished setup
  if (user && !consentAccepted) {
    return (
      <NavigationContainer>
        <PostSignInStack />
      </NavigationContainer>
    )
  }

  // 🌐 Default: always show AppTabs
  // - If guest → AppTabs renders restricted versions
  // - If signed in → AppTabs renders full versions
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
