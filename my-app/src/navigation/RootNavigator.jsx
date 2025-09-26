/* eslint-disable unused-imports/no-unused-imports */
// src/navigation/RootNavigator.jsx
/* eslint-disable unused-imports/no-unused-vars */
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
import SignUp from "../onboarding/SignUp" // placeholder if not yet built

const Stack = createNativeStackNavigator()

// --- Stacks ---
function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={OnboardingWelcome} />
      <Stack.Screen name="ProfileStub" component={ProfileStub} />
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

  // 🟢 If not signed in, show ModeChooser first
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
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="GuestTabs" component={GuestTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 🟢 If signed in but hasn’t given consent
  if (!consentAccepted) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Consent" component={ConsentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  // 🟢 If signed in & consented
  const hasProfile = true // swap later with real profile check
  return (
    <NavigationContainer>
      {hasProfile ? <AppTabs /> : <OnboardingStack />}
    </NavigationContainer>
  )
}
