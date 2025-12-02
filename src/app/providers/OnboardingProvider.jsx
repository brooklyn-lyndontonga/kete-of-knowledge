/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
  const [hasOnboarded, setHasOnboarded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem("hasOnboarded").then(value => {
      if (value === "true") setHasOnboarded(true)
    })
  }, [])

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true")
    setHasOnboarded(true)
  }

  return (
    <OnboardingContext.Provider
      value={{
        hasOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => useContext(OnboardingContext)
