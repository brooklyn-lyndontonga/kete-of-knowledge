import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider"

const Ctx = createContext({ isFirstLogin: false })
export const useOnboarding = () => useContext(Ctx)

export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [isFirstLogin, setIsFirstLogin] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user) { setIsFirstLogin(false); return }
      const { data: profile } = await supabase
        .from("profiles")
        .select("completed")
        .eq("user_id", user.id)
        .maybeSingle()
      if (!cancelled) setIsFirstLogin(!profile?.completed)
    })()
    return () => { cancelled = true }
  }, [user])

  return <Ctx.Provider value={{ isFirstLogin }}>{children}</Ctx.Provider>
}
