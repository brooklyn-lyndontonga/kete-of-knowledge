// App.js
import "react-native-gesture-handler"   // must be first
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"

import React from "react"
import RootNavigator from "./src/navigation/RootNavigator"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <RootNavigator />
      </OnboardingProvider>
    </AuthProvider>
  )
}
