import { createContext, useCallback, useContext, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { initContentApi } from "../api/content.api"

/**
 * Auth context that exposes:
 *  - getToken()  — async function returning a valid Auth0 access token
 *  - role        — the user's admin role ("admin" | "editor")
 *  - user        — the Auth0 user profile object
 *  - logout()    — logs the user out of Auth0
 *
 * The role is read from the Auth0 access token's custom namespace claim,
 * which is injected by an Auth0 Action during the login flow.
 *
 * NAMESPACE must match the Action you configure in Auth0.
 */
const ROLE_CLAIM_NAMESPACE = "https://kete.app/role"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { getAccessTokenSilently, user, logout: auth0Logout } = useAuth0()

  const getToken = useCallback(async () => {
    try {
      return await getAccessTokenSilently()
    } catch (err) {
      console.error("Failed to get Auth0 access token", err)
      throw err
    }
  }, [getAccessTokenSilently])

  // Bind the token getter to the content API layer so all adminFetch
  // calls include a valid Bearer token automatically.
  useEffect(() => {
    initContentApi(getToken)
  }, [getToken])

  // Role comes from the ID token claims (Auth0 Action injects it).
  // The @auth0/auth0-react SDK surfaces custom claims on the `user` object.
  const role = user?.[ROLE_CLAIM_NAMESPACE] || "editor"

  const logout = useCallback(() => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } })
  }, [auth0Logout])

  return (
    <AuthContext.Provider value={{ getToken, role, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context anywhere in the admin app.
 *
 * Usage:
 *   const { getToken, role, user, logout } = useAuthContext()
 */
export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuthContext must be used inside <AuthProvider>")
  }
  return ctx
}
