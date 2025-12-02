import React, { useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../app/providers/AuthProvider"
import { useOnboarding } from "../../../app/providers/OnboardingProvider"

export default function LaunchScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const { session, loading } = useAuth()
  const { hasOnboarded } = useOnboarding()

  useEffect(() => {
    if (loading) return // wait for auth to finish loading

    const timer = setTimeout(() => {
      if (!session) {
        // No user logged in → Welcome Back/Login flow
        navigation.replace("WelcomeBack")
      } else if (!hasOnboarded) {
        // Logged in but not finished onboarding
        navigation.replace("CompleteProfile")
      } else {
        // Onboarded + authenticated → main app
        navigation.replace("Home")
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [session, loading, hasOnboarded, navigation])

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(800).springify()}>
        <Text style={styles.appName}>Kete o te Mātauranga</Text>
        <Text style={styles.tagline}>Whāia te mātauranga — seek knowledge.</Text>
      </Animated.View>

      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
    </View>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.xl,
    },
    appName: {
      fontFamily: typography.heading,
      fontSize: 30,
      textAlign: "center",
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    tagline: {
      fontFamily: typography.body,
      fontSize: 14,
      textAlign: "center",
      opacity: 0.8,
      color: colors.text,
    },
  })
}
