/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
import React, { createContext, useContext, useEffect, useState } from "react"
import supabase from "../auth/supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    let timeoutId

    // initial session check
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    // listen for changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const subscription = data?.subscription

    // fallback to avoid stuck loading
    timeoutId = setTimeout(() => {
      if (mounted) setLoading(false)
    }, 500)

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription?.unsubscribe?.()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
