/* src/navigation/stacks/ProfileStack.jsx */
/* eslint-disable unused-imports/no-unused-vars */
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../../app/providers/AuthProvider"

// Full-access screens
import ProfileScreen from "../../screens/profile/ProfileScreen"
import ProfileGuidelinesScreen from "../../screens/profile/ProfileGuidelinesScreen"

// Guest placeholder (locked)
import RestrictedScreen from "../../screens/home/RestrictedScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="ProfilesHome"
        component={isGuest ? RestrictedScreen : ProfileScreen}
        options={{ title: "Profiles" }}
        initialParams={
          isGuest ? { cta: "Sign in to manage your profile" } : undefined
        }
      />
      <Stack.Screen
        name="ProfileGuidelines"
        component={isGuest ? RestrictedScreen : ProfileGuidelinesScreen}
        options={{ title: "Guidelines" }}
        initialParams={
          isGuest ? { cta: "Sign in to view profile guidelines" } : undefined
        }
      />
    </Stack.Navigator>
  )
}
