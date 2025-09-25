import { createContext, useContext, useState } from "react"

const OnboardingCtx = createContext(null)
export function OnboardingProvider({ children }) {
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [email, setEmail] = useState("")
  return (
    <OnboardingCtx.Provider value={{ consentAccepted, setConsentAccepted, email, setEmail }}>
      {children}
    </OnboardingCtx.Provider>
  )
}
export const useOnboarding = () => useContext(OnboardingCtx)
