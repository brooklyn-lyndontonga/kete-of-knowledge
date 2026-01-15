import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppTabs from "./tabs/AppTabs"

export default function RootNavigator() {
  console.log("🟦 RootNavigator rendered")

  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  )
}
