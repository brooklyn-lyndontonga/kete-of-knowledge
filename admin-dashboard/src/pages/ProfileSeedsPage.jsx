/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/ProfileSeedsPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/profile-seeds"

export default function ProfileSeedsPage() {
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadSeeds() {
    setLoading(true)
    const res = await fetch(API)
    const data = await res.json()
    setSeeds(data)
    setLoading(false)
  }

  async function addSeed(body) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadSeeds()
  }

  async function updateSeed(id, body) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadSeeds()
  }

  async function deleteSeed(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    loadSeeds()
  }

  useEffect(() => {
    loadSeeds()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Profile Seeds</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "label", label: "Label" },
          { key: "value", label: "Value" },
        ]}
        data={seeds}
        onAdd={addSeed}
        onUpdate={updateSeed}
        onDelete={deleteSeed}
      />
    </div>
  )
}
