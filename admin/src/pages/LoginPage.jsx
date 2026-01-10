// src/pages/LoginPage.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

export default function LoginPage() {
  const { login, error } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("KeteAdmin123!")
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLocalError(null)
    setSubmitting(true)

    try {
      await login(email, password)
      navigate("/", { replace: true })
    } catch (err) {
      setLocalError(err.message || "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 25px rgba(15,23,42,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
          Kete Admin Login
        </h1>

        <label style={{ display: "block", marginTop: "1rem" }}>
          <span style={{ display: "block", marginBottom: "0.25rem" }}>
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5f5",
            }}
          />
        </label>

        <label style={{ display: "block", marginTop: "1rem" }}>
          <span style={{ display: "block", marginBottom: "0.25rem" }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5f5",
            }}
          />
        </label>

        {(localError || error) && (
          <div
            style={{
              marginTop: "1rem",
              color: "#b91c1c",
              fontSize: "0.9rem",
            }}
          >
            {localError || error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: "1.5rem",
            width: "100%",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "none",
            background: submitting ? "#9ca3af" : "#2563eb",
            color: "white",
            fontWeight: "600",
            cursor: submitting ? "default" : "pointer",
          }}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
