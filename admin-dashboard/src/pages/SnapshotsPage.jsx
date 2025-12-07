/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/SnapshotsPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/snapshots"

export default function SnapshotsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRows() {
    setLoading(true)
    const res = await fetch(API)
    const data = await res.json()
    setRows(data)
    setLoading(false)
  }

  async function addRow(body) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadRows()
  }

  async function updateRow(id, body) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadRows()
  }

  async function deleteRow(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    loadRows()
  }

  useEffect(() => {
    loadRows()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Progress Snapshots</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "label", label: "Label" },
          { key: "percentage", label: "Percentage" },
          { key: "color", label: "Color (hex)" },
        ]}
        data={rows}
        onAdd={addRow}
        onUpdate={updateRow}
        onDelete={deleteRow}
      />
    </div>
  )
}
