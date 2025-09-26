/* eslint-disable unused-imports/no-unused-vars */
// src/navigation/tabs/AppTabs.jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../../context/AuthContext"

// Feature stacks
import HomeStack from "../stacks/HomeStack"
import ProfileStack from "../stacks/ProfileStack"
import LibraryStack from "../stacks/LibraryStack"
import SettingsStack from "../stacks/SettingsStack"

// Restricted placeholders
import RestrictedScreen from "../../screens/RestrictedScreen"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  const { user } = useAuth()
  const isGuest = !user

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={isGuest ? RestrictedScreen : ProfileStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Library"
        component={isGuest ? RestrictedScreen : LibraryStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
