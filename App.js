import React, { useEffect } from "react"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
import { View } from "react-native"

import RootNavigator from "./src/navigation/RootNavigator"
import { ThemeProvider } from "./src/app/providers/ThemeProvider"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"
import DevBypass from "./src/app/dev/DevBypass"
import { verifySupabase } from "./src/features/auth/lib/verifySupabase"

export default function App() {
  useEffect(() => {
    if (__DEV__) verifySupabase()
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <View style={{ flex: 1 }}>
            <RootNavigator /> 
            <DevBypass />
          </View>
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
