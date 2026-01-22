/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading] = useState(false)

  const value = {
    session,
    loading,
    login: (user) => setSession(user),
    logout: () => setSession(null),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
