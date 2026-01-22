/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import {
  setAdminToken,
  setStoredAdmin,
  clearAdminToken,
  clearStoredAdmin,
  getStoredAdmin,
  getAdminToken,
  fetchAdminMe,
  loginAdminApi,
} from "../api/adminClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(getStoredAdmin())
  const [loading, setLoading] = useState(true)

  // --------------------------------------------------
  // BOOTSTRAP SESSION FROM LOCAL STORAGE
  // --------------------------------------------------
  useEffect(() => {
    async function bootstrap() {
      const token = getAdminToken()

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const adminData = await fetchAdminMe()
        setAdmin(adminData)
        setStoredAdmin(adminData)
      } catch {
        clearAdminToken()
        clearStoredAdmin()
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  // --------------------------------------------------
  // LOGIN (used by Login.jsx)
  // --------------------------------------------------
  async function login(credentials) {
    const data = await loginAdminApi(credentials)
    setSession(data)
  }

  // --------------------------------------------------
  // SHARED SESSION SETTER
  // --------------------------------------------------
  function setSession(data) {
    setAdminToken(data.token)
    setStoredAdmin(data.admin)
    setAdmin(data.admin)
  }

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  function logout() {
    clearAdminToken()
    clearStoredAdmin()
    setAdmin(null)
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        loading,
        login,
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
