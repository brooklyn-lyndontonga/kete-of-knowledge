// import React from "react"
// import { View, Text, ActivityIndicator } from "react-native"
// import { NavigationContainer } from "@react-navigation/native"

// import { useAuth } from "../providers/AuthProvider"
// import { useOnboarding } from "../providers/OnboardingProvider"

// import AppTabs from "./tabs/AppTabs"
// import OnboardingStack from "./stacks/OnboardingStack"

// export default function RootNavigator() {
//   const { session, loading } = useAuth()
//   const { hasOnboarded } = useOnboarding()

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//         <Text>Loading…</Text>
//       </View>
//     )
//   }

//   return (
//     <NavigationContainer>
//       {!session ? (
//         <OnboardingStack />
//       ) : !hasOnboarded ? (
//         <OnboardingStack initialRouteName="CompleteProfile" />
//       ) : (
//         <AppTabs />
//       )}
//     </NavigationContainer>
//   )
// }


import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppTabs from './AppTabs'

export default function RootNavigator() {
  console.log('🔥 ROOT NAVIGATOR RENDERED')

  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  )
}

