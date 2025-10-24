// src/navigation/tabs/AppTabs.jsx
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../../app/providers/AuthProvider"
import { useTheme } from "../../app/providers/ThemeProvider"

// 🧭 Stacks
import {
  HomeStack,
  ProfileStack,
  HubStack,
  LibraryStack,
  SettingsStack,
} from "../stacks"


// 🧱 Restricted placeholder
import RestrictedScreen from "../../screens/RestrictedScreen"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  const { theme } = useTheme() // ✅ moved inside the component
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedText,
        tabBarStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="Profile"
        component={isGuest ? RestrictedScreen : ProfileStack}
        initialParams={
          isGuest
            ? { cta: "Sign in to manage your profile" }
            : undefined
        }
        options={{ title: "Profile" }}
      />

      <Tab.Screen
        name="Tāku Manawa"
        component={isGuest ? RestrictedScreen : HubStack}
        initialParams={
          isGuest
            ? { cta: "Sign in to access Tāku Manawa (Hub)" }
            : undefined
        }
        options={{ title: "Tāku Manawa" }}
      />

      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{ title: "Library" }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  )
}
