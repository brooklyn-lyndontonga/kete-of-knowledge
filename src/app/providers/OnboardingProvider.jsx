// src/context/OnboardingContext.jsx
/* eslint-disable unused-imports/no-unused-imports */
import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { useAuth } from "./AuthProvider" // ✅ correct now

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
  const { user } = useAuth()
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setConsentAccepted(false)
      setProfileComplete(false)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("profiles")
        .select("consent_accepted_at, profile_completed_at")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("❌ Failed to fetch profile:", error)
      } else if (data) {
        setConsentAccepted(!!data.consent_accepted_at)
        setProfileComplete(!!data.profile_completed_at)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const isFirstLogin = !consentAccepted || !profileComplete

  return (
    <OnboardingContext.Provider
      value={{
        consentAccepted,
        setConsentAccepted,
        profileComplete,
        setProfileComplete,
        isFirstLogin,
        loading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
