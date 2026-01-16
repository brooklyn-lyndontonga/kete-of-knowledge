import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ThemeProvider } from "./src/app/providers/ThemeProvider"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"
import RootNavigator from "./src/app/navigation/RootNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <OnboardingProvider>
            <RootNavigator />
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
