import React, { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { supabase } from "../../features/auth/lib/supabaseClient"

const AuthCtx = createContext({ user: null, session: null, loading: true, isGuest: true })
export const useAuth = () => useContext(AuthCtx)

const TEMP_CONSENT_KEY = "consent:temp"

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // DEV: mock sign-in (UI only; no backend) when flagged
  const DEV_FORCE =
    __DEV__ &&
    (process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1" ||
     Constants?.expoConfig?.extra?.FORCE_SIGNED_IN === 1)

  // 1) hydrate session, 2) handle magic-link deep link, 3) subscribe to auth changes
  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const sub = Linking.addEventListener("url", async ({ url }) => {
      const { queryParams } = Linking.parse(url)
      const code = queryParams?.code
      if (!code) return
      const { data, error } = await supabase.auth.exchangeCodeForSession({ code })
      if (error) {
        console.warn("Auth exchange failed:", error.message)
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
      sub.remove()
      authSub.subscription.unsubscribe()
    }
  }, [])

  // DEV: force a mock user (skip backend)
  useEffect(() => {
    if (!DEV_FORCE) return
    const fakeUser = {
      id: "dev-user-0001",
      email: "dev@mock.local",
      app_metadata: { provider: "dev" },
      user_metadata: { name: "Dev User" },
    }
    setSession({ user: fakeUser })
    setUser(fakeUser)
    setLoading(false)
  }, [DEV_FORCE])

  // After login, push pre-auth consent (captured locally) to Supabase profile
  useEffect(() => {
    if (!user) return
    ;(async () => {
      const raw = await AsyncStorage.getItem(TEMP_CONSENT_KEY)
      if (!raw) return
      const { consentAcceptedAt } = JSON.parse(raw)

      // Skip writes when using mock user
      const isMock = DEV_FORCE || String(user.id).startsWith("dev-user-")
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
    })().catch(() => {})
  }, [user, DEV_FORCE])

  return (
    <AuthCtx.Provider value={{ user, session, loading, isGuest: !user }}>
      {children}
    </AuthCtx.Provider>
  )
}
