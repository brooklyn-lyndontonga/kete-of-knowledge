/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../../lib/api"

const OnboardingContext = createContext()

const STORAGE_KEY = "hasOnboarded"

export function OnboardingProvider({ children }) {
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [loading, setLoading] = useState(true)

  // 🔁 Load persisted onboarding state (navigation gate)
  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        setHasOnboarded(stored === "true")
      } catch (err) {
        console.warn("Failed to read onboarding state:", err)
        setHasOnboarded(false)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  /**
   * Complete onboarding
   * - Navigation unblocks immediately
   * - Backend work is best-effort
   * - No throws
   */
  async function completeOnboarding(profileData) {
    // 1️⃣ Flip the navigation gate FIRST
    try {
      await AsyncStorage.setItem(STORAGE_KEY, "true")
      setHasOnboarded(true)
    } catch (err) {
      console.warn("Failed to persist onboarding flag:", err)
      // Even if this fails, we still proceed
      setHasOnboarded(true)
    }

    // 2️⃣ Fire-and-forget backend work
    ;(async () => {
      try {
        // Create profile
        const profileRes = await fetch(`${API_URL}/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        })

        if (!profileRes.ok) {
          console.warn("Profile creation failed")
          return
        }

        const profile = await profileRes.json()

        // Fetch admin-defined seeds
        const seedsRes = await fetch(`${API_URL}/profileSeeds`)
        if (!seedsRes.ok) {
          console.warn("Failed to fetch profile seeds")
          return
        }

        const seeds = await seedsRes.json()

        // Attach seeds to user
        const attachRes = await fetch(`${API_URL}/userProfileSeeds`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileId: profile.id,
            seeds,
          }),
        })

        if (!attachRes.ok) {
          console.warn("Failed to attach profile seeds")
        }
      } catch (err) {
        console.warn("Onboarding backend work failed:", err)
      }
    })()
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
