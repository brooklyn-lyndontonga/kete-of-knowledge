/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../auth/supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ check supabase before using
    if (!supabase) {
      console.error("❌ Supabase client is not defined")
      return
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error("Error fetching session:", error)
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.subscription?.unsubscribe?.()
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
