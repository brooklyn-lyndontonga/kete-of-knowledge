/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import { supabase } from "./supabaseClient"
import { upsertConsentIfNeeded } from "./consent"

const AuthCtx = createContext({ user:null, session:null, loading:true })

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user:null, session:null, loading:true })

  useEffect(() => {
    let mounted = true

    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setState({ user: data.session?.user ?? null, session: data.session, loading:false })
    }
    init()

    const sub = supabase.auth.onAuthStateChange(async (_evt, session) => {
      setState({ user: session?.user ?? null, session, loading:false })
      if (session?.user) await upsertConsentIfNeeded(session.user.id)
    })

    const urlSub = Linking.addEventListener("url", async ({ url }) => {
      try {
        await supabase.auth.exchangeCodeForSession({ redirectTo: Linking.createURL("auth") })
      } catch (e) { console.error(e) }
    })

    return () => { mounted=false; sub.data.subscription.unsubscribe(); urlSub.remove() }
  }, [])

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>
}
export const useAuth = () => useContext(AuthCtx)
