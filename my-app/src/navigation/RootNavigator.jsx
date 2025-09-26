/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
// src/navigation/RootNavigator.jsx
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, View, ActivityIndicator } from "react-native"
import { useAuth } from "../context/AuthContext"
import { useOnboarding } from "../context/OnboardingContext"

// Screens
import ModeChooser from "../screens/ModeChooser"
import EmailSignIn from "../onboarding/EmailSignIn"
import ConsentScreen from "../onboarding/ConsentScreen"
import OnboardingWelcome from "../onboarding/OnboardingWelcome"
import ProfileStub from "../onboarding/ProfileStub"
import Done from "../onboarding/Done"
import AppTabs from "./tabs/AppTabs"
import GuestTabs from "./tabs/GuestTabs"
import PostSignInWelcome from "../onboarding/PostSignInWelcome"
import CompleteProfile from "../onboarding/CompleteProfile"

const Stack = createNativeStackNavigator()

// --- Onboarding stack (if profile setup is separate) ---
function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={OnboardingWelcome} />
      <Stack.Screen name="ProfileStub" component={ProfileStub} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}

// --- Post sign-in setup (first-time users) ---
function PostSignInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostSignInWelcome" component={PostSignInWelcome} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}

// --- Loading screen ---
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Loading…</Text>
    </View>
  )
}

// --- Root Navigator ---
export default function RootNavigator() {
  const { user, loading } = useAuth()
  const { consentAccepted } = useOnboarding()

  // ⏳ Still checking auth/session
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

  // 🔑 Not signed in → ModeChooser
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ModeChooser"
            component={ModeChooser}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
          <Stack.Screen
            name="GuestTabs"
            component={GuestTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 📜 Signed in but hasn’t completed setup (consent/profile)
  const hasCompletedSetup = consentAccepted // later add profile check too
  if (!hasCompletedSetup) {
    return (
      <NavigationContainer>
        <PostSignInStack />
      </NavigationContainer>
    )
  }

  // 👤 Signed in + fully onboarded
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  )
}
