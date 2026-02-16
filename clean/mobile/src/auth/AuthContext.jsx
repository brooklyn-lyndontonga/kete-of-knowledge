 
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Linking from "expo-linking"
import { API_BASE_URL } from "../api/apiConfig"

console.log("🔌 AuthContext using API_BASE_URL:", API_BASE_URL)

const AuthContext = createContext(null)
const STORAGE_KEY = "auth_session"
const GUEST_KEY = "guest_session"

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const [guest, setGuest] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  // 1. Load session on mount
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(STORAGE_KEY),
      AsyncStorage.getItem(GUEST_KEY),
    ])
      .then(([rawSession, rawGuest]) => {
        if (rawSession) {
          setSession(JSON.parse(rawSession))
          setGuest(false)
          return
        }

        if (rawGuest === "true") {
          setGuest(true)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // 2. Handle Deep Links
  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event
      const parsed = Linking.parse(url)
      
      if (parsed.path === "auth" && parsed.queryParams?.token) {
        verifyMagicLink(parsed.queryParams.token)
      }
    }

    // Check initial URL
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url })
    })

    // Listen for incoming links
    const sub = Linking.addEventListener("url", handleDeepLink)
    return () => sub.remove()
  }, [])

  const sendMagicLink = async (email) => {
    setAuthenticating(true)
    try {
      const res = await fetch(`${API_BASE_URL}/app/auth/magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to send magic link")
      }
      return { ok: true, message: data.message }
    } catch (err) {
      console.error("Magic link error:", err)
      return { ok: false, error: err.message }
    } finally {
      setAuthenticating(false)
    }
  }

  const verifyMagicLink = async (token) => {
    setAuthenticating(true)
    try {
      const res = await fetch(`${API_BASE_URL}/app/auth/verify-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Verification failed")
      }

      const newSession = {
        token: data.token,
        user: data.user,
      }

      setSession(newSession)
      setGuest(false)
      setShowAuth(false)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
      await AsyncStorage.removeItem(GUEST_KEY)
      return { ok: true }
    } catch (err) {
      console.error("Verification error:", err)
      return { ok: false, error: err.message }
    } finally {
      setAuthenticating(false)
    }
  }

  const logout = async () => {
    setSession(null)
    setGuest(false)
    await AsyncStorage.removeItem(STORAGE_KEY)
    await AsyncStorage.removeItem(GUEST_KEY)
  }

  const continueAsGuest = async () => {
    setGuest(true)
    setShowAuth(false)
    await AsyncStorage.setItem(GUEST_KEY, "true")
  }

  const openAuth = () => setShowAuth(true)
  const closeAuth = () => setShowAuth(false)

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token),
      isGuest: guest,
      isLoading: loading,
      isAuthenticating: authenticating,
      showAuth,
      sendMagicLink,
      verifyMagicLink,
      logout,
      continueAsGuest,
      openAuth,
      closeAuth,
    }),
    [session, guest, loading, authenticating, showAuth]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
