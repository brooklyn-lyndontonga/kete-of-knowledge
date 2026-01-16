import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppDataContext } from "../../context/AppDataContext"
import { useAppDataProvider } from "../../hooks/useAppData"
import AppTabs from "./tabs/AppTabs"

export default function RootNavigator() {
  console.log("🟦 RootNavigator rendered")

  const appData = useAppDataProvider()

  return (
    <AppDataContext.Provider value={appData}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </AppDataContext.Provider>
  )
}
