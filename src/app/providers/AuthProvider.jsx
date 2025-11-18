// src/app/providers/AuthProvider.jsx
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { supabase } from "../../features/auth/lib/supabaseClient"

const AuthCtx = createContext({
  user: null,
  session: null,
  loading: true,
  isGuest: true,
})

export const useAuth = () => useContext(AuthCtx)

const TEMP_CONSENT_KEY = "consent:temp"

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const DEV_FORCE =
    __DEV__ &&
    (process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1" ||
      Constants?.expoConfig?.extra?.FORCE_SIGNED_IN === 1)

  useEffect(() => {
    console.log("👤 AuthProvider mounted")

    if (DEV_FORCE) {
      console.log("⚙️ Using DEV mock user")
      const fakeUser = {
        id: "dev-user-0001",
        email: "mock@kete.local",
        app_metadata: { provider: "dev" },
        user_metadata: { name: "Mock User" },
      }
      setSession({ user: fakeUser })
      setUser(fakeUser)
      setLoading(false)
      return
    }

    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const deepLinkSub = Linking.addEventListener("url", async ({ url }) => {
      const { queryParams } = Linking.parse(url)
      const code = queryParams?.code
      if (!code) return

      const { data, error } = await supabase.auth.exchangeCodeForSession({
        code,
      })
      if (error) {
        console.warn("⚠️ Auth code exchange failed:", error.message)
        return
      }
      setSession(data.session)
      setUser(data.session.user)
    })

    const { data: authSub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess ?? null)
      setUser(sess?.user ?? null)
    })

    return () => {
      mounted = false
      deepLinkSub.remove()
      authSub.subscription.unsubscribe()
    }
  }, [DEV_FORCE])

  useEffect(() => {
    if (!user) return

    ;(async () => {
      const raw = await AsyncStorage.getItem(TEMP_CONSENT_KEY)
      if (!raw) return

      const { consentAcceptedAt } = JSON.parse(raw)
      const isMock = DEV_FORCE || user.id?.startsWith("dev-user-")

      if (isMock) {
        await AsyncStorage.removeItem(TEMP_CONSENT_KEY)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("consent_accepted_at")
        .eq("user_id", user.id)
        .maybeSingle()

      if (!profile?.consent_accepted_at) {
        await supabase.from("profiles").upsert({
          user_id: user.id,
          consent_accepted_at: consentAcceptedAt || new Date().toISOString(),
        })
      }

      await AsyncStorage.removeItem(TEMP_CONSENT_KEY)
    })().catch((e) => console.warn("⚠️ Consent sync failed:", e.message))
  }, [user, DEV_FORCE])

  useEffect(() => {
    if (!loading)
      console.log("👤 Auth state:", { user, session, loading })
  }, [user, session, loading])

  return (
    <AuthCtx.Provider value={{ user, session, loading, isGuest: !user }}>
      {children}
    </AuthCtx.Provider>
  )
}
