// src/navigation/PostSignInStack.jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// onboarding screens
import PostSignInWelcome from "../features/onboarding/screens/PostSignInWelcome"
import CompleteProfile from "../features/onboarding/screens/CompleteProfile"
import ConsentScreen from "../features/onboarding/screens/ConsentScreen"
import Done from "../features/onboarding/screens/Done"

const Stack = createNativeStackNavigator()

export default function PostSignInStack() {
  return (
    <Stack.Navigator
      initialRouteName="PostSignInWelcome"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen
        name="PostSignInWelcome"
        component={PostSignInWelcome}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{ title: "Complete Profile" }}
      />
      <Stack.Screen
        name="Consent"
        component={ConsentScreen}
        options={{ title: "Consent" }}
      />
      <Stack.Screen
        name="Done"
        component={Done}
        options={{
          headerShown: false,
          gestureEnabled: false, // disables swipe-back on iOS
        }}
      />
    </Stack.Navigator>
  )
}
