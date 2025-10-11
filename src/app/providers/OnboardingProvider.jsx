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
 */
export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [returningStatus, setReturningStatus] = useState({
    hasConsent: true,
    hasCompleted: true,
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
    let cancelled = false
    ;(async () => {
      if (!user) {
        if (cancelled) return
        setIsFirstLogin(false)
        setReturningStatus({ hasConsent: true, hasCompleted: true })
        return
      }

      // DEV overrides
      const stored = ((await AsyncStorage.getItem("dev:onboardingMode")) || "")
        .toLowerCase()
      const mode = (stored || devEnvMode).toLowerCase()

      if (__DEV__ && (DEV_FORCE || mode)) {
        if (mode === "first") {
          if (!cancelled) {
            setIsFirstLogin(true)
            setReturningStatus({ hasConsent: false, hasCompleted: false })
          }
          return
        }
        if (mode === "returning") {
          if (!cancelled) {
            setIsFirstLogin(false)
            setReturningStatus({ hasConsent: true, hasCompleted: true })
          }
          return
        }
      }

      // Real Supabase check
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("consent_accepted_at, completed")
        .eq("user_id", user.id)
        .maybeSingle()

      if (cancelled) return

      if (error) {
        setIsFirstLogin(true)
        setReturningStatus({ hasConsent: false, hasCompleted: false })
        return
      }

      const hasConsent = !!profile?.consent_accepted_at
      const hasCompleted = !!profile?.completed
      setIsFirstLogin(!hasCompleted)
      setReturningStatus({ hasConsent, hasCompleted })
    })()

    return () => {
      cancelled = true
    }
  }, [user, DEV_FORCE, devEnvMode])

  useEffect(() => {
    console.log("🪶 Onboarding state:", { isFirstLogin, returningStatus })
  }, [isFirstLogin, returningStatus])

  return (
    <Ctx.Provider value={{ isFirstLogin, returningStatus }}>
      {children}
    </Ctx.Provider>
  )
}
