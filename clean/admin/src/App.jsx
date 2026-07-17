import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { AuthProvider } from "./auth/auth-context"
import AdminLayout from "./layouts/AdminLayout"

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0()
  const [page, setPage] = useState("dashboard")

  // Auth0 SDK is initialising — show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60 font-medium">Initializing session…</p>
        </div>
      </div>
    )
  }

  // Auth0 returned an error (e.g. callback mismatch, misconfigured audience)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
          <div className="card-body text-center">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-2 text-xl font-bold">
              ⚠️
            </div>
            <h2 className="card-title justify-center text-error text-xl mb-1">
              Authentication Error
            </h2>
            <p className="text-sm text-base-content/70 mb-4">{error.message}</p>
            <button
              className="btn btn-primary rounded-xl w-full"
              onClick={() => loginWithRedirect()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unauthenticated — render Kete Admin Sign-In Page powered by Auth0
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 rounded-3xl overflow-hidden">
          <div className="p-8 text-center space-y-6">
            {/* Kete Brand Header */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-content font-extrabold text-3xl shadow-lg shadow-primary/30">
              K
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-base-content tracking-tight">
                Kete of Knowledge
              </h1>
              <p className="text-sm text-base-content/60 mt-1">
                Admin & Content Management Portal
              </p>
            </div>

            <div className="divider text-xs text-base-content/40 my-2">
              Secure Auth0 Authentication
            </div>

            {/* Auth0 Login Button */}
            <div className="space-y-3">
              <button
                className="btn btn-primary btn-lg w-full rounded-2xl shadow-md gap-3 font-semibold hover:scale-[1.01] transition-transform"
                onClick={() => loginWithRedirect()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In with Auth0
              </button>

              <p className="text-xs text-base-content/50 px-4">
                Access is restricted to authorized administrative and editor personnel.
              </p>
            </div>
          </div>

          <div className="bg-base-200/50 p-4 text-center border-t border-base-200 text-xs text-base-content/40">
            Kete of Knowledge Platform • Managed Identity Security
          </div>
        </div>
      </div>
    )
  }

  // Authenticated — render Admin Portal
  return (
    <AuthProvider>
      <AdminLayout
        current={page}
        onNavigate={setPage}
      />
    </AuthProvider>
  )
}
