import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import BackgroundLayout from "../../ui/layout/BackgroundLayout"
import { AppDataProvider } from "../providers/AppDataProvider"
import AppTabs from "./tabs/AppTabs"

export default function RootNavigator() {
  return (
    <BackgroundLayout depth={0}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppDataProvider>
            <AppTabs />
          </AppDataProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </BackgroundLayout>
  )
}
