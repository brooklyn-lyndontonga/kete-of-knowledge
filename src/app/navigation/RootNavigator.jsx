 
/* eslint-disable no-unused-vars */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppTabs from "./tabs/AppTabs"
import OnboardingStack from "./stacks/OnboardingStack"
import { useOnboarding } from "../providers/OnboardingProvider"
import { useAuth } from "../providers/AuthProvider"
import { navigationRef } from "./navigationRef"




export default function RootNavigator() {
  const { session } = useAuth()

  return (
    <NavigationContainer ref={navigationRef}>
      {session?.user ? <AppTabs /> : <OnboardingStack />}
    </NavigationContainer>
  )
}
