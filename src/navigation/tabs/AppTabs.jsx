import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../../app/providers/AuthProvider"

import HomeStack from "../stacks/HomeStack"
import HubStack from "../stacks/HubStack"
import LibraryStack from "../stacks/LibraryStack"
import ProfileStack from "../stacks/ProfileStack"
import SettingsStack from "../stacks/SettingsStack"
import RestrictedScreen from "../../screens/home/RestrictedScreen"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 12 } }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="Profile"
        component={isGuest ? RestrictedScreen : ProfileStack}
        initialParams={isGuest ? { cta: "Sign in to manage your profile" } : undefined}
      />

      <Tab.Screen
        name="Tāku Manawa"
        component={isGuest ? RestrictedScreen : HubStack}
        initialParams={isGuest ? { cta: "Sign in to access Tāku Manawa (Hub)" } : undefined}
        options={{ title: "Tāku Manawa" }}
      />

      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
