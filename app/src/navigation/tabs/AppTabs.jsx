import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeStack from "../stacks/HomeStack"
import HubStack from "../stacks/HubStack"
import LibraryStack from "../stacks/LibraryStack"
import ProfileStack from "../stacks/ProfileStack"
import SettingsStack from "../stacks/SettingsStack"
import RestrictedScreen from "../../../screens/home/RestrictedScreen"
import { useAuth } from "../../../context/AuthContext"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Home / Kāinga" }}
      />

      <Tab.Screen
        name="TākuManawa"
        component={isGuest ? RestrictedScreen : HubStack}
        initialParams={
          isGuest ? { cta: "Haina mai ki te uru atu ki Tāku Manawa" } : undefined
        }
        options={{ title: "Tāku Manawa" }}
      />

      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{ title: "Puna / Library" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: "Kōtaha / Profile" }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ title: "Tautuhinga / Settings" }}
      />

    </Tab.Navigator>
  )
}
