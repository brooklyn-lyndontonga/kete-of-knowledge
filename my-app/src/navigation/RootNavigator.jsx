/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Linking from "expo-linking"
import { supabase } from "../auth/supabaseClient"

// Example screens (replace with your real stacks/screens)
import SignInScreen from "../screens/SignInScreen"
import HomeScreen from "../screens/HomeScreen"

const Tab = createBottomTabNavigator()

function RootNavigator() {
  // Handle magic link callback
  useEffect(() => {
    const subscription = Linking.addEventListener("url", async ({ url }) => {
      console.log("🔗 Received deep link:", url)
      const { data, error } = await supabase.auth.exchangeCodeForSession(url)

      if (error) {
        console.error("❌ Error exchanging code:", error.message)
      } else {
        console.log("✅ Signed in as:", data.user?.email)
      }
    })

    return () => subscription.remove()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="SignIn" component={SignInScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
