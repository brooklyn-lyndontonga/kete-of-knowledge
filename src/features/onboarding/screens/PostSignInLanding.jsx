import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useOnboarding } from "../../../app/providers/OnboardingProvider"
import { useAuth } from "../../../app/providers/AuthProvider"

export default function PostSignInLanding({ navigation }) {
  const { user } = useAuth()
  const { isFirstLogin } = useOnboarding()

  // If returning, you can either auto-redirect or show a quick CTA.
  useEffect(() => {
    if (user && !isFirstLogin) {
      // Option A: instant redirect to tabs
      const t = setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
      }, 400)
      return () => clearTimeout(t)
    }
  }, [user, isFirstLogin, navigation])

  if (!user) {
    // Shouldn’t happen here, but be safe:
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
        <Text style={{ marginBottom: 16, fontSize: 18, fontWeight: "600" }}>
          You’re not signed in
        </Text>
        <Button title="Go to Sign in" onPress={() => navigation.replace("EmailSignIn")} />
      </View>
    )
  }

  if (isFirstLogin) {
    // First-time welcome → continue to Consent
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
          Kia ora! Welcome 🎉
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Let’s get you set up. We’ll start with terms and privacy, then a quick profile.
        </Text>
        <Button title="Continue" onPress={() => navigation.navigate("Consent")} />
      </View>
    )
  }

  // Returning user (brief message, auto-redirect also runs)
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
        Welcome back 👋
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Taking you to your dashboard…
      </Text>
      <Button title="Skip now" onPress={() => navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })} />
    </View>
  )
}
