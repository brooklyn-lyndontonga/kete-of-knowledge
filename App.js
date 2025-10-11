import React, { useEffect } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

// 🌿 Providers
import { ThemeProvider } from "./src/app/providers/ThemeProvider"
import { AuthProvider } from "./src/app/providers/AuthProvider"
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider"

// 🧭 Navigation
import RootNavigator from "./src/navigation/RootNavigator"

// 🧪 Dev Tool
import DevBypass from "./src/app/dev/DevBypass"

// 🖋 Fonts — import directly from the packages
import { PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand"
import { Raleway_700Bold } from "@expo-google-fonts/raleway"

// 🚀 Keep splash visible while fonts load
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Quicksand_500Medium,
    Raleway_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <RootNavigator />
          <DevBypass />
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
