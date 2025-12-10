// admin-dashboard/src/pages/HomeContentPage.jsx
import React, { useEffect, useState } from "react"
import { api } from "../api/client"   // use your API wrapper

export default function HomeContentPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.get("/admin/stats")   // correct path
        setStats(data)
      } catch (err) {
        console.error("Failed to load admin stats:", err)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Overview</h1>

      {!stats && <p>Loading...</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">Resources: {stats.resources}</div>
          <div className="stat-card">Conditions: {stats.conditions}</div>
          <div className="stat-card">Snapshots: {stats.snapshots}</div>
        </div>
      )}
    </div>
  )
}
