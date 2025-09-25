/* eslint-disable unused-imports/no-unused-imports */
import React, { createContext, useContext, useState } from "react"

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
  const [consented, setConsented] = useState(false)

  return (
    <OnboardingContext.Provider value={{ consented, setConsented }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
