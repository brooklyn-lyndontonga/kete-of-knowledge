import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider"

const Ctx = createContext({
  isFirstLogin: false,
  returningStatus: { hasConsent: true, hasCompleted: true },
})
export const useOnboarding = () => useContext(Ctx)

/**
 * isFirstLogin:
 *   true  → route user to PostSignInStack (Consent → CompleteProfile → Done)
 *   false → route user to AppTabs
 *
 * returningStatus: useful if you want to branch inside onboarding
 */
export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [returningStatus, setReturningStatus] = useState({
    hasConsent: true,
    hasCompleted: true,
  })

  // Dev helpers / flags
  const extra = Constants?.expoConfig?.extra ?? {}
  const DEV_FORCE =
    __DEV__ &&
    (extra.FORCE_SIGNED_IN === 1 ||
      process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1")
  const devEnvMode =
    (process.env.EXPO_PUBLIC_DEV_USER_MODE || extra.DEV_USER_MODE || "")
      .toString()
      .toLowerCase() // "first" | "returning" | ""

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      // If no user, treat as guest (no onboarding gating needed here)
      if (!user) {
        if (cancelled) return
        setIsFirstLogin(false)
        setReturningStatus({ hasConsent: true, hasCompleted: true })
        return
      }

      // ----- DEV OVERRIDES -----
      // 1) persistent menu override
      const stored = ((await AsyncStorage.getItem("dev:onboardingMode")) ||
        "").toLowerCase()

      // 2) env/config override
      const mode = (stored || devEnvMode).toLowerCase()
      if (__DEV__ && (DEV_FORCE || mode)) {
        if (mode === "first") {
          if (cancelled) return
          setIsFirstLogin(true)
          setReturningStatus({ hasConsent: false, hasCompleted: false })
          return
        }
        if (mode === "returning") {
          if (cancelled) return
          setIsFirstLogin(false)
          setReturningStatus({ hasConsent: true, hasCompleted: true })
          return
        }
        // if DEV_FORCE but no explicit mode, just fall through to real check
      }

      // ----- REAL BEHAVIOR (no override) -----
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("consent_accepted_at, completed")
        .eq("user_id", user.id)
        .maybeSingle()

      if (cancelled) return

      if (error) {
        // If profile missing or error, treat as first login
        setIsFirstLogin(true)
        setReturningStatus({ hasConsent: false, hasCompleted: false })
        return
      }

      const hasConsent = !!profile?.consent_accepted_at
      const hasCompleted = !!profile?.completed

      // You can decide your gating here; commonly:
      // isFirstLogin = !hasCompleted (forces user through onboarding until 'Done')
      setIsFirstLogin(!hasCompleted)
      setReturningStatus({ hasConsent, hasCompleted })
    }

    run()
    return () => {
      cancelled = true
    }
  }, [user, DEV_FORCE, devEnvMode])

  return (
    <Ctx.Provider value={{ isFirstLogin, returningStatus }}>
      {children}
    </Ctx.Provider>
  )
}
