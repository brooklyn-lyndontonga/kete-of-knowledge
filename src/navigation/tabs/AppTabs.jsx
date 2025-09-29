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

export default function AppTabs() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 12 }, }} >
      <Tab.Screen name="Home" component={HomeStack} />
      {/* Profile is restricted for guests */}
      <Tab.Screen name="Profile" component={isGuest ? RestrictedScreen : ProfileStack} initialParams={ isGuest ? { cta: "Sign in to manage your profile" } : undefined } />
      {/* Hub is restricted for guests */}
      <Tab.Screen name="Tāku Manawa" component={isGuest ? RestrictedScreen : HubStack} initialParams={ isGuest ? { cta: "Sign in to access Tāku Manawa (Hub)" } : undefined } options={{ title: "Tāku Manawa" }} />
      {/* Library is allowed for guests (read-only content) */}
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
