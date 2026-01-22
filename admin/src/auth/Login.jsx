import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdminApi } from "../api/adminClient"
import { useAuth } from "./AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { setSession } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await loginAdminApi({ email, password })

      // Save token + admin in context + localStorage
      setSession(data)

      // Go to admin home
      navigate("/", { replace: true })
    } catch (err) {
      console.error(err)
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: 24,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: 8 }}>Admin Login</h1>
        <p style={{ marginBottom: 24, color: "#666" }}>
          Sign in to manage Kete content
        </p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 12 }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 16 }}
        />

        {error && (
          <div style={{ color: "red", marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  )
}
