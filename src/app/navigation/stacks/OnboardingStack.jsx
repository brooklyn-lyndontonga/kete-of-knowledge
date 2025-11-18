import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LaunchScreen from "../../../features/welcome/screens/LaunchScreen"
import WelcomeBackScreen from "../../../features/welcome/screens/WelcomeBackScreen"

import ConsentScreen from "../../../features/onboarding/screens/ConsentScreen"
import CompleteProfile from "../../../features/onboarding/screens/CompleteProfile"
import EmailSignIn from "../../../features/onboarding/screens/EmailSignIn"
import EmailSignUp from "../../../features/onboarding/screens/EmailSignUp"
import Done from "../../../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="SignIn" component={EmailSignIn} />
      <Stack.Screen name="SignUp" component={EmailSignUp} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}
