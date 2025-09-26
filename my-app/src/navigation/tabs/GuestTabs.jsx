/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
// src/navigation/tabs/GuestTabs.jsx
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text, View } from "react-native"
import GuestSettings from "../../screens/GuestSettings"

const Tab = createBottomTabNavigator()

function Placeholder({ message }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 22 }}>{message}</Text>
    </View>
  )
}

export default function GuestTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="GuestHome"
        children={() => (
          <Placeholder message={`Welcome to Guest Mode 👋\n\nThis is a preview of the app’s features. As a guest you can browse and explore the layout, but you won’t have access to personalised content or data until you sign in.`} />
        )}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="GuestResources"
        children={() => (
          <Placeholder message={`Resource Library (Guest Preview) 🔒\n\nIn Guest Mode, you can see educational materials, tools, or resources.\n\nTo unlock the full library and save your progress, you’ll need to sign in or create an account.`} />
        )}
        options={{ title: "Resources" }}
      />
      <Tab.Screen
        name="GuestSettings"
        component={GuestSettings}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  )
}
