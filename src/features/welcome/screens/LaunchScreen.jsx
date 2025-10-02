import React, { useEffect, useState, useCallback } from "react"
import { View, Text, Button, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../../../app/providers/AuthProvider"
import { verifySupabase } from "../../auth/lib/verifySupabase"  // ← add this

const SEEN_KEY = "landing:hasSeen"

export default function LaunchScreen({ navigation }) {
  const { user } = useAuth()
  const [checking, setChecking] = useState(true)

  // Dev-only: verify Supabase keys/connection once on mount
  useEffect(() => {
    if (__DEV__) verifySupabase()
  }, [])

  const goTabsReset = useCallback(async () => {
    await AsyncStorage.setItem(SEEN_KEY, "1")
    navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
  }, [navigation])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!user) { setChecking(false); return }
      const seen = await AsyncStorage.getItem(SEEN_KEY)
      if (mounted && seen === "1") {
        navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
        return
      }
      if (mounted) setChecking(false)
    })()
    return () => { mounted = false }
  }, [user, navigation])

  if (user && checking) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>Loading…</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
        <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>Kia ora — Nau mai</Text>
        <Text style={{ textAlign:"center", marginBottom:20 }}>
          Explore in guest mode, or use your email to unlock everything.
        </Text>
        <View style={{ width:"100%", gap:12 }}>
          <Button title="Continue with email" onPress={() => navigation.navigate("EmailSignIn")} />
          <Button title="Continue as guest" onPress={() => navigation.replace("AppTabs")} />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>Welcome 👋</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        Quick tour of where everything lives. You can revisit this in Settings.
      </Text>
      <View style={{ width:"100%", gap:12 }}>
        <Button title="Go to dashboard" onPress={goTabsReset} />
      </View>
    </View>
  )
}
