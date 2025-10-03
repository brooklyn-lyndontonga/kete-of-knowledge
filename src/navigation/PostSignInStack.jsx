import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ConsentScreen from "../features/onboarding/screens/ConsentScreen"
import CompleteProfile from "../features/onboarding/screens/CompleteProfile"
import Done from "../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function PostSignInStack() {
  return (
    <Stack.Navigator initialRouteName="Consent">
      <Stack.Screen name="Consent" component={ConsentScreen} options={{ title: "Privacy & Consent" }} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{ title: "Your profile" }} />
      <Stack.Screen name="Done" component={Done} options={{ title: "All set!" }} />
    </Stack.Navigator>
  )
}
