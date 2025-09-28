/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* src/navigation/tabs/AppTabs.jsx */
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../../app/providers/AuthProvider"

// stacks
import HomeStack from "../stacks/HomeStack"
import HubStack from "../stacks/HubStack"
import LibraryStack from "../stacks/LibraryStack"
import ProfileStack from "../stacks/ProfileStack"
import SettingsStack from "../stacks/SettingsStack"

// restricted placeholder (guest)
import RestrictedScreen from "../../features/auth/screens/RestrictedScreen"

const Tab = createBottomTabNavigator()

function AppTabs() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Tāku Manawa" component={HubStack} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={isGuest ? RestrictedScreen : LibraryStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={isGuest ? RestrictedScreen : ProfileStack} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default AppTabs