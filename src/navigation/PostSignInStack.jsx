import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ConsentScreen from "../features/onboarding/screens/ConsentScreen"
import CompleteProfile from "../features/onboarding/screens/CompleteProfile"
import Done from "../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function PostSignInStack() {
  return (
    <Stack.Navigator
      initialRouteName="Consent"
      screenOptions={{ headerShown: true, headerTitleAlign: "center", headerBackTitleVisible: true }}
    >
      <Stack.Screen name="Consent" component={ConsentScreen} options={{ title: "Consent" }} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{ title: "Complete profile" }} />
      <Stack.Screen name="Done" component={Done} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
