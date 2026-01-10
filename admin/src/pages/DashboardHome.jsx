// admin/src/pages/DashboardHome.jsx
import React, { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { fetchAdminStats } from "../api/adminClient"

export default function DashboardHome() {
  const { admin, logout } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminStats()
        setStats(data)
      } catch (err) {
        setError(err.message || "Failed to load stats")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div style={{ padding: "1.5rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
            Kete Admin Dashboard
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            Kia ora, {admin?.name || admin?.email}
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      {stats && (
        <pre
          style={{
            background: "#0f172a",
            color: "#e5e7eb",
            padding: "1rem",
            borderRadius: "0.75rem",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}
    </div>
  )
}
