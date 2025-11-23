import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "./navigationRef"
import AppTabs from "./tabs/AppTabs"
import OnboardingStack from "./stacks/OnboardingStack"
import { useAuth } from "../../context/AuthContext"

export default function RootNavigator() {
  const { session } = useAuth()

  return (
    <NavigationContainer ref={navigationRef}>
      {session?.user ? <AppTabs /> : <OnboardingStack />}
    </NavigationContainer>
  )
}
