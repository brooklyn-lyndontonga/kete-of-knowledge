/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useAdminToast } from "../components/AdminToastProvider"
import * as homeApi from "../api/homeContent"

export default function HomeContentPage() {
  const { showToast } = useAdminToast()

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await homeApi.fetchAdminStats()
        setStats(data)
      } catch (err) {
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, []) // ← clean, React-approved

  if (loading) return <p>Loading…</p>

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Overview</h1>

      {!stats && <p>No data available.</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">Resources: {stats.resources}</div>
          <div className="stat-card">Categories: {stats.categories}</div>
          <div className="stat-card">Whakataukī: {stats.whakatauki}</div>
          <div className="stat-card">Conditions: {stats.conditions}</div>
          <div className="stat-card">Support Contacts: {stats.support}</div>
          <div className="stat-card">Snapshots: {stats.snapshots}</div>
        </div>
      )}
    </div>
  )
}
