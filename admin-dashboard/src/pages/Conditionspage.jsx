/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/ConditionsPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/conditions"

export default function ConditionsPage() {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadConditions() {
    setLoading(true)
    const res = await fetch(API)
    const data = await res.json()
    setConditions(data)
    setLoading(false)
  }

  async function addCondition(body) {
    body.triggers = JSON.stringify(body.triggers || [])
    body.treatments = JSON.stringify(body.treatments || [])
    body.images = JSON.stringify(body.images || [])

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadConditions()
  }

  async function updateCondition(id, body) {
    body.triggers = JSON.stringify(body.triggers || [])
    body.treatments = JSON.stringify(body.treatments || [])
    body.images = JSON.stringify(body.images || [])

    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadConditions()
  }

  async function deleteCondition(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    loadConditions()
  }

  useEffect(() => {
    loadConditions()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Conditions</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "name", label: "Condition Name" },
          { key: "description", label: "Description" },
          { key: "triggers", label: "Triggers (JSON)" },
          { key: "treatments", label: "Treatments (JSON)" },
          { key: "images", label: "Images (JSON)" },
        ]}
        data={conditions}
        onAdd={addCondition}
        onUpdate={updateCondition}
        onDelete={deleteCondition}
      />
    </div>
  )
}
