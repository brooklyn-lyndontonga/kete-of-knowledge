/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer, useEffect } from "react"

// --- Mock for DEV mode ---
const MOCK_USER = {
  id: "dev-user-0001",
  email: "mock@kete.local",
  user_metadata: { name: "Mock User" },
  app_metadata: { provider: "dev" },
}

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    session: null,
    user: null,
  })

  useEffect(() => {
    // For now: always logged-in for dev
    dispatch({
      type: "LOGIN",
      payload: { session: { user: MOCK_USER }, user: MOCK_USER },
    })
  }, [])

  const value = {
    session: state.session,
    user: state.user,
    loading: state.loading,

    // later: add supabase login/logout
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        session: action.payload.session,
        user: action.payload.user,
        loading: false,
      }
    case "LOGOUT":
      return { session: null, user: null, loading: false }
    default:
      return state
  }
}

export function useAuth() {
  return useContext(AuthContext)
}
