/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAdminToast } from "../components/AdminToastProvider"

import { fetchAdminStats } from "../api/homeContent"
import { fetchWhakatauki } from "../api/whakatauki"

export default function HomeContentPage() {
  const { showToast } = useAdminToast()

  const [stats, setStats] = useState(null)
  const [whakatauki, setWhakatauki] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHome() {
      try {
        setLoading(true)

        const [statsData, whakataukiList] = await Promise.all([
          fetchAdminStats(),
          fetchWhakatauki(),
        ])

        setStats(statsData)

        if (Array.isArray(whakataukiList) && whakataukiList.length > 0) {
          const random =
            whakataukiList[Math.floor(Math.random() * whakataukiList.length)]
          setWhakatauki(random)
        }
      } catch (err) {
        console.error(err)
        showToast("Failed to load dashboard", "error")
      } finally {
        setLoading(false)
      }
    }

    loadHome()
  }, [])

  if (loading) return <p>Loading dashboard…</p>

  return (
    <div className="page-container">
      <h1>Admin Overview</h1>

      {/* Stats */}
      {stats && (
        <div className="dashboard-grid">
          <StatCard label="Reflections" value={stats.reflections} />
          <StatCard label="Templates" value={stats.templates} />
          <StatCard label="Snapshots" value={stats.snapshots} />
          <StatCard label="Profile Seeds" value={stats.profileSeeds} />
        </div>
      )}

      {/* Dynamic Whakataukī */}
      {whakatauki && (
        <Link to="/whakatauki" style={{ textDecoration: "none" }}>
          <div className="dashboard-card dashboard-card--wide">
            <h3>Whakataukī</h3>

            <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
              “{whakatauki.text}”
            </p>

            {whakatauki.translation && (
              <p style={{ color: "#666" }}>
                {whakatauki.translation}
              </p>
            )}

            <p style={{ marginTop: "0.75rem", color: "#267f53" }}>
              View all whakataukī →
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__value">{value}</div>
      <div className="dashboard-card__label">{label}</div>
    </div>
  )
}
