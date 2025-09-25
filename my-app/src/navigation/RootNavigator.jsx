/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { linking } from "./linking"
import { useAuth } from "../auth/AuthProvider"
import { OnboardingProvider, useOnboarding } from "../context/OnboardingContext"
import ConsentScreen from "../onboarding/ConsentScreen"
import EmailSignIn from "../onboarding/EmailSignIn"
import OnboardingWelcome from "../onboarding/OnboardingWelcome"
import ProfileStub from "../onboarding/ProfileStub"
import Done from "../onboarding/Done"
import AppTabs from "./tabs/AppTabs"

const Stack = createNativeStackNavigator()
function ConsentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Consent" component={ConsentScreen}/>
      <Stack.Screen name="EmailSignIn" component={EmailSignIn}/>
    </Stack.Navigator>
  )
}
function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={OnboardingWelcome}/>
      <Stack.Screen name="ProfileStub" component={ProfileStub}/>
      <Stack.Screen name="Done" component={Done}/>
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  const { user, loading } = useAuth()
  const { consentAccepted } = useOnboarding()
  if (loading) return null

  if (!consentAccepted) return (
    <NavigationContainer linking={linking}><ConsentStack/></NavigationContainer>
  )

  if (!user) return (
    <NavigationContainer linking={linking}><ConsentStack/></NavigationContainer>
  )

  // (Optional) check profile presence via a lightweight query/cached flag
  const hasProfile = true // TODO: replace with real check later
  return (
    <NavigationContainer linking={linking}>
      {hasProfile ? <AppTabs/> : <OnboardingStack/>}
    </NavigationContainer>
  )
}
