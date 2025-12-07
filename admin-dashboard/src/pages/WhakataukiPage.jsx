/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/WhakataukiPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/whakatauki"

export default function WhakataukiPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRows() {
    setLoading(true)
    const res = await fetch(API)
    setRows(await res.json())
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
      <h1 className="page-title">Whakataukī</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "text", label: "Text" },
          { key: "translation", label: "Translation" },
        ]}
        data={rows}
        onAdd={addRow}
        onUpdate={updateRow}
        onDelete={deleteRow}
      />
    </div>
  )
}
