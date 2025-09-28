/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* src/navigation/PostSignInStack.jsx */
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostSignInWelcome from "../onboarding/PostSignInWelcome"
import CompleteProfile from "../onboarding/CompleteProfile"
import ConsentScreen from "../onboarding/ConsentScreen"
import Done from "../onboarding/Done"

const Stack = createNativeStackNavigator()

function PostSignInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostSignInWelcome" component={PostSignInWelcome} options={{ title: "Welcome" }} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}

export default PostSignInStack