// src/features/welcome/screens/LaunchScreen.jsx
import React, { useEffect, useState, useCallback } from "react"
import { View, Text, Button, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { useAuth } from "../../../app/providers/AuthProvider"

const APP_VERSION = Constants?.expoConfig?.version ?? "1"
const SEEN_KEY = `landing:hasSeen:v${APP_VERSION}`

export default function LaunchScreen({ navigation }) {
  const { user } = useAuth()
  const [checking, setChecking] = useState(true)

  const goTabsReset = useCallback(async () => {
    await AsyncStorage.setItem(SEEN_KEY, "1")
    navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
  }, [navigation])

  // For signed-in users, skip this screen after they’ve seen it once
  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        if (!user) return
        const seen = await AsyncStorage.getItem(SEEN_KEY)
        if (mounted && seen === "1") {
          navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
          return
        }
      } finally {
        if (mounted) setChecking(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [user, navigation])

  // Loading state only when signed-in and we’re checking "seen"
  if (user && checking) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>Loading…</Text>
      </View>
    )
  }

  // --- Guest landing (unified "Continue with email") ---
  if (!user) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
        <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>
          Kia ora — Nau mai
        </Text>
        <Text style={{ textAlign:"center", marginBottom:20 }}>
          Explore in guest mode, or continue with your email to unlock everything.
        </Text>

        <View style={{ width:"100%", gap:12 }}>
          <Button
            title="Continue with email"
            onPress={() => navigation.navigate("EmailSignIn")}
            accessibilityLabel="Continue with email"
          />
          <Button
            title="Continue as guest"
            onPress={() => navigation.replace("AppTabs")}
          />
        </View>

        <Text style={{ marginTop:12, fontSize:12, opacity:0.7, textAlign:"center" }}>
          By continuing you agree to our Terms & Privacy.
        </Text>
      </View>
    )
  }

  // --- Signed-in landing (first time only) ---
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>
        Welcome back 👋
      </Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        Here’s a quick tour of where everything lives. You can revisit this in Settings.
      </Text>

      <View style={{ width:"100%", gap:12 }}>
        <Button title="Go to dashboard" onPress={goTabsReset} />
      </View>
    </View>
  )
}
