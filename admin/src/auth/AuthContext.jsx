/* eslint-disable react-refresh/only-export-components */
// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  getAdminToken,
  setAdminToken,
  clearAdminToken,
  getStoredAdmin,
  setStoredAdmin,
  clearStoredAdmin,
  loginAdminApi,
  fetchAdminMe,
} from "../api/adminClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hydrate existing session on load
  useEffect(() => {
    async function init() {
      try {
        const token = getAdminToken()
        const storedAdmin = getStoredAdmin()
        if (!token) {
          setLoading(false)
          return
        }

        try {
          const me = await fetchAdminMe()
          setAdmin(me.admin || storedAdmin || null)
        } catch (err) {
          console.warn("Token invalid, clearing:", err.message)
          handleLogout()
        }
      } finally {
        setLoading(false)
      }
    }

    init()
     
  }, [])

  function handleLogout() {
    clearAdminToken()
    clearStoredAdmin()
    setAdmin(null)
  }

  async function handleLogin(email, password) {
    setError(null)
    try {
      const { token, admin: adminPayload } = await loginAdminApi({
        email,
        password,
      })

      setAdminToken(token)
      setStoredAdmin(adminPayload)
      setAdmin(adminPayload)

      return adminPayload
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    }
  }

  const value = {
    admin,
    loading,
    error,
    isAuthenticated: !!admin,
    login: handleLogin,
    logout: handleLogout,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
