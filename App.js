import React from "react"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
import { View } from "react-native"

import RootNavigator from "./src/navigation/RootNavigator"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"
import ModePill from "./src/ui/components/ModePill"
import DevBypass from "./src/app/dev/DevBypass"

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <View style={{ flex: 1 }}>
          <RootNavigator />
          <ModePill />
          <DevBypass />
        </View>
      </OnboardingProvider>
    </AuthProvider>
  )
}
