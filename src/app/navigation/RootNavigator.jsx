import React from "react"
import { NavigationContainer } from "@react-navigation/native"

import { AppDataContext } from "../../context/AppDataContext"
import { useAppData } from "../../hooks/useAppData"
import AppTabs from "./tabs/AppTabs"

export default function RootNavigator() {
  const appData = useAppData()

  return (
    <AppDataContext.Provider value={appData}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </AppDataContext.Provider>
  )
}
