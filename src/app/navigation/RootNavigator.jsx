import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppDataProvider } from "../providers/AppDataProvider"
import AppTabs from "./tabs/AppTabs"

export default function RootNavigator() {
  console.log("🟦 RootNavigator rendered")

  return (
    <AppDataProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </AppDataProvider>
  )
}
