import React, { useState } from "react"
import { useAdminToast } from "../components/AdminToastProvider"

import { exportCSV, exportJSON } from "../utils/exporters"

import * as reflectionsApi from "../api/reflections"
import * as snapshotsApi from "../api/snapshots"

export default function ExportsPage() {
  const { showToast } = useAdminToast()
  const [loading, setLoading] = useState(false)

  async function handleExport(type, format) {
    try {
      setLoading(true)

      let data = []
      let filename = ""

      if (type === "reflections") {
        data = await reflectionsApi.fetchReflections()
        filename = `reflections.${format}`
      }

      if (type === "snapshots") {
        data = await snapshotsApi.fetchSnapshots()
        filename = `snapshots.${format}`
      }

      if (format === "json") exportJSON(data, filename)
      if (format === "csv") exportCSV(data, filename)

      showToast("Export complete", "success")
    } catch (err) {
      console.error(err)
      showToast(err.message || "Export failed", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>Global Exports</h1>

      <p style={{ marginBottom: "1rem", color: "#555" }}>
        Download system data for backup, migration, or analysis.
      </p>

      <div className="dashboard-grid">
        <ExportCard
          title="Reflections"
          onJSON={() => handleExport("reflections", "json")}
          onCSV={() => handleExport("reflections", "csv")}
          disabled={loading}
        />

        <ExportCard
          title="Snapshots"
          onJSON={() => handleExport("snapshots", "json")}
          onCSV={() => handleExport("snapshots", "csv")}
          disabled={loading}
        />
      </div>
    </div>
  )
}

function ExportCard({ title, onJSON, onCSV, disabled }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>

      <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button className="btn-secondary" onClick={onJSON} disabled={disabled}>
          Export JSON
        </button>

        <button className="btn-primary" onClick={onCSV} disabled={disabled}>
          Export CSV
        </button>
      </div>
    </div>
  )
}
