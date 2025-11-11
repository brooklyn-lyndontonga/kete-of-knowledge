import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from "../stacks/HomeStack"
import ProfileStack from "../stacks/ProfileStack"
import HubStack from "../stacks/HubStack"
import LibraryStack from "../stacks/LibraryStack"
import SettingsStack from "../stacks/SettingsStack"
import { Text } from "react-native"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#267f53",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          paddingBottom: 6,
          height: 60,
        },
        tabBarLabel: ({ focused, children }) => (
          <Text style={{ fontSize: 12, fontWeight: focused ? "600" : "400" }}>
            {children}
          </Text>
        ),
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Tāku Manawa" component={HubStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
