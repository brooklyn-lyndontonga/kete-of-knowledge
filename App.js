// App.js (project root)
import React from "react"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"

import RootNavigator from "./src/navigation/RootNavigator"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"
import DevBypass from "./src/app/dev/DevBypass"

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <RootNavigator />
        <DevBypass />
      </OnboardingProvider>
    </AuthProvider>
  )
}
