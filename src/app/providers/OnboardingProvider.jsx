/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../../lib/api"

const OnboardingContext = createContext()

const STORAGE_KEY = "hasOnboarded"

export function OnboardingProvider({ children }) {
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [loading, setLoading] = useState(true)

  // 🔁 Load persisted onboarding state
  useEffect(() => {
    async function load() {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      setHasOnboarded(stored === "true")
      setLoading(false)
    }
    load()
  }, [])

  async function completeOnboarding(profileData) {
    try {
      // 1️⃣ Create profile
      const profileRes = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })

      if (!profileRes.ok) {
        throw new Error("Failed to create profile")
      }

      const profile = await profileRes.json()

      // 2️⃣ Fetch admin-defined profile seeds
      const seedsRes = await fetch(`${API_URL}/profileSeeds`)
      if (!seedsRes.ok) {
        throw new Error("Failed to fetch profile seeds")
      }

      const seeds = await seedsRes.json()

      // 3️⃣ Attach seeds to user
      await fetch(`${API_URL}/userProfileSeeds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: profile.id,
          seeds,
        }),
      })

      // 4️⃣ Persist onboarding completion
      await AsyncStorage.setItem(STORAGE_KEY, "true")
      setHasOnboarded(true)
    } catch (err) {
      console.error("Onboarding failed:", err)
      throw err
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        hasOnboarded,
        completeOnboarding,
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
