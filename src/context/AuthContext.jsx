/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
/* src/context/AuthContext.jsx */
import React, { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import supabase from "../auth/supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const urlSub = Linking.addEventListener("url", async ({ url }) => {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(url)
        if (!error) setUser(data.session?.user ?? null)
      } catch (e) {
        console.error("Deep link exchange failed", e)
      } finally {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      authListener?.subscription?.unsubscribe?.()
      urlSub.remove()
    }
  }, [])

  // Dev helper (only attach in development)
  const devHelpers = {}
  if (__DEV__) {
    devHelpers.signInAsDev = (overrides = {}) =>
      setUser({
        id: "dev-user-id",
        email: "dev@example.com",
        ...overrides,
      })
    devHelpers.signOutDev = () => setUser(null)
  }

  // expose user, loading, and dev helpers in dev only
  return (
    <AuthContext.Provider value={{ user, loading, ...devHelpers }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
