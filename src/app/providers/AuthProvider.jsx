import React, { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { upsertConsentIfNeeded } from "../../features/auth/lib/consent"

const AuthCtx = createContext({ user: null, session: null, loading: true })
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null)
      setUser(data.session?.user || null)
      setLoading(false)
    })

    // deep link listener for magic link
    const sub = Linking.addEventListener("url", async ({ url }) => {
      const { data, error } = await supabase.auth.exchangeCodeForSession({ code: Linking.parse(url)?.queryParams?.code })
      if (!error) {
        setSession(data.session)
        setUser(data.session.user)
      }
    })

    // auth state changes
    const { data: subAuth } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess || null)
      setUser(sess?.user || null)
    })

    return () => {
      sub.remove()
      subAuth.subscription.unsubscribe()
    }
  }, [])

  // Whenever we have a user, push consent if needed
  useEffect(() => {
    if (!user) return
    upsertConsentIfNeeded(user.id).catch(() => {})
  }, [user])

  return (
  <AuthCtx.Provider value={{ user, session, loading, isGuest: !user, role: user ? "user" : "guest" }}>
    {children}
  </AuthCtx.Provider>
)
}
