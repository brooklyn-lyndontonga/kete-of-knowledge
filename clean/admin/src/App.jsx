import { useState, useEffect, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { AuthProvider } from "./auth/auth-context"
import AdminLayout from "./layouts/AdminLayout"

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0()
  const [page, setPage] = useState("dashboard")
  const redirectAttempted = useRef(false)

  // Auth0 SDK is initialising — show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60">Loading…</p>
        </div>
      </div>
    )
  }

  // Auth0 returned an error (e.g. misconfigured API audience, callback mismatch)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-error text-xl mb-2">
              Authentication Error
            </h2>
            <p className="text-sm text-base-content/70 mb-4">{error.message}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                redirectAttempted.current = false
                loginWithRedirect()
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Not logged in — redirect to Auth0 Universal Login (once only to prevent loops)
  if (!isAuthenticated) {
    if (!redirectAttempted.current) {
      redirectAttempted.current = true
      loginWithRedirect()
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60">Redirecting to login…</p>
        </div>
      </div>
    )
  }

  // Authenticated — render the admin panel wrapped in AuthProvider
  // (AuthProvider needs to live inside Auth0Provider so it can call useAuth0)
  return (
    <AuthProvider>
      <AdminLayout
        current={page}
        onNavigate={setPage}
      />
    </AuthProvider>
  )
}
