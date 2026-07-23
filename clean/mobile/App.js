import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope"
import RootStack from "./src/stacks/RootStack"
import { initDB } from "./src/db"
import { a11y, colors, typography } from "./src/theme"
import { AuthProvider } from "./src/auth/AuthContext"
import { SyncProvider } from "./src/sync/SyncContext"
import { LanguageProvider } from "./src/i18n/LanguageContext"

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.style = [
  { color: colors.text, fontFamily: typography.body.fontFamily },
  Text.defaultProps.style,
]
// Respect the reader's OS text size, capped so cards stay intact.
Text.defaultProps.allowFontScaling = true
Text.defaultProps.maxFontSizeMultiplier = a11y.maxFontSizeMultiplier
TextInput.defaultProps = TextInput.defaultProps || {}
TextInput.defaultProps.placeholderTextColor = colors.muted
TextInput.defaultProps.style = [
  { color: colors.text, fontFamily: typography.body.fontFamily },
  TextInput.defaultProps.style,
]
TextInput.defaultProps.allowFontScaling = true
TextInput.defaultProps.maxFontSizeMultiplier = a11y.maxFontSizeMultiplier

export default function App() {
  const [dbReady, setDbReady] = useState(false)

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  })

  useEffect(() => {
    let cancelled = false

    initDB()
      .catch((err) => console.error("Database init failed:", err))
      .finally(() => {
        if (!cancelled) setDbReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (!fontsLoaded || !dbReady) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={colors.olive} />
      </SafeAreaView>
    )
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View pointerEvents="none" style={styles.background}>
          <View style={styles.glowTop} />
          <View style={styles.glowBottom} />
        </View>
        <LanguageProvider>
          <AuthProvider>
            <SyncProvider>
              <AppContent />
            </SyncProvider>
          </AuthProvider>
        </LanguageProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

function AppContent() {
  return <RootStack />
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cornsilk,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  glowTop: {
    position: "absolute",
    top: -120,
    right: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.meringue,
    opacity: 0.9,
  },
  glowBottom: {
    position: "absolute",
    bottom: -140,
    left: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.laurel,
    opacity: 0.18,
  },
})
