import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider"

const OnboardingContext = createContext({ isFirstLogin: false })
export const useOnboarding = () => useContext(OnboardingContext)

export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [isFirstLogin, setIsFirstLogin] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!user) { setIsFirstLogin(false); return }
      const { data: profile } = await supabase
        .from("profiles")
        .select("completed")
        .eq("user_id", user.id)
        .maybeSingle()
      if (!cancelled) setIsFirstLogin(!profile?.completed)
    }
    run()
    return () => { cancelled = true }
  }, [user])

  return (
    <OnboardingContext.Provider value={{ isFirstLogin }}>
      {children}
    </OnboardingContext.Provider>
  )
}
