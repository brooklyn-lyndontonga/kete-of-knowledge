/* src/navigation/PostSignInStack.jsx */
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostSignInWelcome from "../features/onboarding/screens/PostSignInWelcome"
import CompleteProfile from "../features/onboarding/screens/CompleteProfile"
import ConsentScreen from "../features/onboarding/screens/ConsentScreen"
import Done from "../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function PostSignInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostSignInWelcome" component={PostSignInWelcome} options={{ title: "Welcome" }} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}
