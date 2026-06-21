import { useState } from "react"
import { forgotPassword, resetPassword } from "../api/auth.api"

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.has("resetToken") ? "reset" : "login"
  })
  const [resetToken] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("resetToken") || ""
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleLoginSubmit(event) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await onLogin(email, password)
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotSubmit(event) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const res = await forgotPassword(email)
      setSuccess(res.message || "A password reset link has been sent to your email.")
    } catch (err) {
      setError(err.message || "Failed to request password reset")
    } finally {
      setLoading(false)
    }
  }

  async function handleResetSubmit(event) {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await resetPassword(resetToken, newPassword)
      setSuccess("Password reset successful! You can now log in.")
      window.history.replaceState({}, document.title, window.location.pathname)
      setMode("login")
    } catch (err) {
      setError(err.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">
            {mode === "login" && "Kete Admin"}
            {mode === "forgot" && "Reset Password"}
            {mode === "reset" && "Choose New Password"}
          </h2>

          {error && (
            <div className="alert alert-error text-sm py-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success text-sm py-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{success}</span>
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <div className="flex justify-between items-center">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <button
                    type="button"
                    className="text-xs link link-hover link-primary"
                    onClick={() => {
                      setError("")
                      setSuccess("")
                      setMode("forgot")
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-sm opacity-80 mb-2">
                Enter your email address and we will send you a secure link to reset your password.
              </p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="card-actions flex flex-col gap-2 mt-4">
                <button
                  className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm w-full mt-2"
                  onClick={() => {
                    setError("")
                    setSuccess("")
                    setMode("login")
                  }}
                >
                  Back to login
                </button>
              </div>
            </form>
          )}

          {mode === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>

              <div className="card-actions flex flex-col gap-2 mt-4">
                <button
                  className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm w-full mt-2"
                  onClick={() => {
                    setError("")
                    setSuccess("")
                    window.history.replaceState({}, document.title, window.location.pathname)
                    setMode("login")
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
