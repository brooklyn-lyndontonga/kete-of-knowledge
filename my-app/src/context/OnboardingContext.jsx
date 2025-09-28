/* eslint-disable unused-imports/no-unused-imports */
// src/context/OnboardingContext.jsx
import React, { createContext, useContext, useState } from "react"

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)

  // derived: first login if missing consent OR profile
  const isFirstLogin = !consentAccepted || !profileComplete

  return (
    <OnboardingContext.Provider
      value={{ consentAccepted, setConsentAccepted, profileComplete, setProfileComplete, isFirstLogin }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
