/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from "@react-navigation/native"
import { useAuth } from "../providers/AuthProvider"
import { useOnboarding } from "../providers/OnboardingProvider"
import AppTabs from "./tabs/AppTabs"
import OnboardingStack from "./stacks/OnboardingStack"
import { navigationRef } from "./navigationRef"

export default function RootNavigator() {
  const { session, loading } = useAuth()
  const { hasOnboarded } = useOnboarding()

  if (loading) return null // splash later

  return (
    <NavigationContainer ref={navigationRef}>
      {!session ? (
        // NOT LOGGED IN → onboarding/auth flow
        <OnboardingStack />
      ) : !hasOnboarded ? (
        // LOGGED IN but NOT onboarded
        <OnboardingStack initialRouteName="CompleteProfile" />
      ) : (
        // READY
        <AppTabs />
      )}
    </NavigationContainer>
  )
}
