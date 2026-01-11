// admin/src/dashboard/AdminHome.jsx
import React, { useEffect, useState } from "react"
import "./AdminHome.css"

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

export default function AdminHome() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("kofk_admin_token")
        if (!token) {
          setError("Not authenticated – please log in again.")
          setLoading(false)
          return
        }

        const res = await fetch("http://localhost:3000/api/admin/stats", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}))
          throw new Error(errBody.error || "Failed to load stats")
        }

        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error("AdminHome loadStats error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return <p>Loading dashboard…</p>
  }

  if (error) {
    return <p className="admin-error">Error: {error}</p>
  }

  if (!stats) {
    return <p>No stats available.</p>
  }

  const { counts, latestSnapshot, latestReflection } = stats

  return (
    <div className="admin-home">
      <header className="admin-home-header">
        <h1>Admin overview</h1>
        <p className="admin-home-subtitle">
          Quick snapshot of Kete of Knowledge content and activity.
        </p>
      </header>

      <section className="admin-home-grid">
        <StatCard label="Conditions" value={counts.conditions} />
        <StatCard label="Resources" value={counts.resources} />
        <StatCard label="Reflection templates" value={counts.reflectionTemplates} />
        <StatCard label="Profile seeds" value={counts.profileSeeds} />
        <StatCard label="Snapshots" value={counts.snapshots} />
        <StatCard label="User reflections" value={counts.userReflections} />
        <StatCard label="Goals (user)" value={counts.goals} />
        <StatCard label="Symptoms (user)" value={counts.symptoms} />
        <StatCard label="My medicines (user)" value={counts.myMedicines} />
      </section>

      <section className="admin-home-latest">
        <div className="latest-panel">
          <h2>Latest snapshot</h2>
          {latestSnapshot ? (
            <div className="latest-card">
              <p className="latest-label">{latestSnapshot.label}</p>
              <p className="latest-meta">
                {latestSnapshot.percentage}% &middot; {latestSnapshot.color || "default"}{" "}
                &middot; {latestSnapshot.created_at}
              </p>
            </div>
          ) : (
            <p>No snapshots yet.</p>
          )}
        </div>

        <div className="latest-panel">
          <h2>Latest reflection</h2>
          {latestReflection ? (
            <div className="latest-card">
              <p className="latest-label">
                {latestReflection.template_title || "Untitled template"}
              </p>
              <p className="latest-response">
                {latestReflection.response?.slice(0, 160) ?? ""}{" "}
                {latestReflection.response &&
                  latestReflection.response.length > 160 &&
                  "…"}
              </p>
              <p className="latest-meta">{latestReflection.created_at}</p>
            </div>
          ) : (
            <p>No reflections yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
