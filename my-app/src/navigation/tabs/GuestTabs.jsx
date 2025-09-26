/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
 
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text, View, Button } from "react-native"

// Basic placeholder screens
function GuestHome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Welcome, Guest!</Text>
      <Text style={{ marginTop: 8 }}>You have limited access. Sign in to unlock more features.</Text>
    </View>
  )
}

function GuestLibrary() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Guest Library</Text>
      <Text style={{ marginTop: 8 }}>Read-only resources available here.</Text>
    </View>
  )
}

function GuestSettings() {
  return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Guest Settings</Text>

      <Button
        title="Change Mode"
        onPress={() => {
          // Reset to ModeChooser
          navigation.reset({
            index: 0,
            routes: [{ name: "ModeChooser" }],
          })
        }}
      />

      <Button
        title="Sign In"
        onPress={() => {
          // Send directly to sign-in flow
          navigation.reset({
            index: 0,
            routes: [{ name: "EmailSignIn" }],
          })
        }}
      />

      <Button
        title="About App"
        onPress={() => alert("App version 1.0.0 — Guest Mode")}
      />
    </View>
  )
}

const Tab = createBottomTabNavigator()

function GuestTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={GuestHome} />
      <Tab.Screen name="Library" component={GuestLibrary} />
      <Tab.Screen name="Settings" component={GuestSettings} />
    </Tab.Navigator>
  )
}

export default GuestTabs