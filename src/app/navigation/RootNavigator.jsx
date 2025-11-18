// src/app/navigation/RootNavigator.jsx
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "./navigationRef"

import AppTabs from "./tabs/AppTabs"
import OnboardingStack from "./stacks/OnboardingStack"

import { useOnboarding } from "../providers/OnboardingProvider"
import { useAuth } from "../providers/AuthProvider"

export default function RootNavigator() {
  const { returningStatus } = useOnboarding()
  const { user, loading } = useAuth()

  if (loading) return null

  const hasCompletedOnboarding = returningStatus.hasCompleted

  return (
    <NavigationContainer ref={navigationRef}>
      {hasCompletedOnboarding || user ? <AppTabs /> : <OnboardingStack />}
    </NavigationContainer>
  )
}
