import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import PostSignInLanding from "../features/onboarding/screens/PostSignInLanding"
import ConsentScreen from "../features/onboarding/screens/ConsentScreen"
import CompleteProfile from "../features/onboarding/screens/CompleteProfile"
import Done from "../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function PostSignInStack() {
  return (
    <Stack.Navigator
      initialRouteName="PostSignInLanding"
      screenOptions={{ headerShown: true, headerBackTitleVisible: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="PostSignInLanding"
        component={PostSignInLanding}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Consent"
        component={ConsentScreen}
        options={{ title: "Consent" }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{ title: "Complete profile" }}
      />
      <Stack.Screen
        name="Done"
        component={Done}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
