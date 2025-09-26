/* eslint-disable unused-imports/no-unused-imports */
import React, { createContext, useContext, useState } from "react"

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
  const [consentAccepted, setConsentAccepted] = useState(false)

  return (
    <OnboardingContext.Provider value={{ consentAccepted, setConsentAccepted }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
