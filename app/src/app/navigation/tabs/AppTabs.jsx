import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeStack from "../stacks/HomeStack"
import ProfileStack from "../stacks/ProfileStack"
import HubStack from "../stacks/HubStack"
import LibraryStack from "../stacks/LibraryStack"
import SettingsStack from "../stacks/SettingsStack"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Hub" component={HubStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
