import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider"

const Ctx = createContext({
  isFirstLogin: false,
  returningStatus: { hasConsent: true, hasCompleted: true },
})
export const useOnboarding = () => useContext(Ctx)

export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [returningStatus, setReturningStatus] = useState({
    hasConsent: true,
    hasCompleted: true,
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user) {
        setIsFirstLogin(false)
        setReturningStatus({ hasConsent: true, hasCompleted: true })
        return
      }
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
    return () => { cancelled = true }
  }, [user])

  return (
    <Ctx.Provider value={{ isFirstLogin, returningStatus }}>
      {children}
    </Ctx.Provider>
  )
}
