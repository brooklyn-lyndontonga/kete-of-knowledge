/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import { supabase } from "../../features/auth/lib/supabaseClient"
import { upsertConsentIfNeeded } from "../../features/auth/lib/consent"

const AuthCtx = createContext({
  user: null,
  session: null,
  loading: true,
})

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    session: null,
    loading: true,
  })

  useEffect(() => {
    let mounted = true

    // 1. Initial session check
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        console.log("🔑 init.getSession:", data, error)
        if (mounted) {
          setState({
            user: data?.session?.user ?? null,
            session: data?.session ?? null,
            loading: false,
          })
        }
      } catch (e) {
        console.error("❌ init.getSession failed", e)
        if (mounted) setState({ user: null, session: null, loading: false })
      }
    }
    init()

    // 2. Auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("📡 Auth change:", event, session)
        if (mounted) {
          setState({ user: session?.user ?? null, session, loading: false })
        }
        if (session?.user) {
          await upsertConsentIfNeeded(session.user.id)
        }
      }
    )

    // 3. Deep link handler
    const urlSub = Linking.addEventListener("url", async ({ url }) => {
      console.log("🔗 Deep link received:", url)
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(url)
        console.log("exchangeCodeForSession:", data, error)
        if (data?.session && mounted) {
          setState({
            user: data.session.user,
            session: data.session,
            loading: false,
          })
          await upsertConsentIfNeeded(data.session.user.id)
        }
      } catch (e) {
        console.error("❌ exchangeCodeForSession failed", e)
      }
    })

    return () => {
      mounted = false
      authListener?.subscription?.unsubscribe?.()
      urlSub.remove()
    }
  }, [])

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
