import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Onboarding screens
import {
  ConsentScreen,
  CompleteProfile,
  EmailSignIn,
  EmailSignUp,
} from "../../../features/onboarding"

// Welcome screens
import LaunchScreen from "../../../features/welcome/LaunchScreen"
import WelcomeBackScreen from "../../../features/welcome/WelcomeBackScreen"

const Stack = createNativeStackNavigator()

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
    </Stack.Navigator>
  )
}
