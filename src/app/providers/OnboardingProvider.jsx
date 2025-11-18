/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// src/app/providers/OnboardingProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider"  // ✅ correct import

const Ctx = createContext({
  isFirstLogin: false,
  returningStatus: { hasConsent: false, hasCompleted: false },
})

export const useOnboarding = () => useContext(Ctx)

export function OnboardingProvider({ children }) {
  const { user, loading: authLoading } = useAuth() || {}

  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [returningStatus, setReturningStatus] = useState({
    hasConsent: false,
    hasCompleted: false,
  })

  const extra = Constants?.expoConfig?.extra ?? {}
  const DEV_FORCE =
    __DEV__ &&
    (extra.FORCE_SIGNED_IN === 1 ||
      process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1")

  const devEnvMode =
    (process.env.EXPO_PUBLIC_DEV_USER_MODE || extra.DEV_USER_MODE || "")
      .toString()
      .toLowerCase()

  useEffect(() => {
    if (authLoading) return
    if (user === undefined) return

    if (!user) {
      setIsFirstLogin(false)
      setReturningStatus({ hasConsent: false, hasCompleted: false })
      return
    }

    let cancelled = false

    ;(async () => {
      const stored = ((await AsyncStorage.getItem("dev:onboardingMode")) || "")
        .toLowerCase()
      const mode = stored || devEnvMode

      if (__DEV__ && (DEV_FORCE || mode)) {
        if (mode === "first") {
          setIsFirstLogin(true)
          setReturningStatus({ hasConsent: false, hasCompleted: false })
          return
        }
        if (mode === "returning") {
          setIsFirstLogin(false)
          setReturningStatus({ hasConsent: true, hasCompleted: true })
          return
        }
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("consent_accepted_at, profile_completed_at")
        .eq("id", user.id)
        .maybeSingle()

      if (cancelled) return

      if (error) {
        setIsFirstLogin(true)
        setReturningStatus({ hasConsent: false, hasCompleted: false })
        return
      }

      const hasConsent = !!profile?.consent_accepted_at
      const hasCompleted = !!profile?.profile_completed_at
      const firstLogin = !(hasConsent && hasCompleted)

      setIsFirstLogin(firstLogin)
      setReturningStatus({ hasConsent, hasCompleted })
    })()

    return () => {
      cancelled = true
    }
  }, [user, authLoading, DEV_FORCE, devEnvMode])

  return (
    <Ctx.Provider value={{ isFirstLogin, returningStatus }}>
      {children}
    </Ctx.Provider>
  )
}
