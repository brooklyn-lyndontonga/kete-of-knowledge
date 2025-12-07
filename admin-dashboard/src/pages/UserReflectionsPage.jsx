/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/UserReflectionsPage.jsx
import React, { useEffect, useState } from "react"
import "./AdminTable.css"

const API = "http://localhost:3000/reflections"

export default function UserReflectionsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRows() {
    setLoading(true)
    const res = await fetch(API)
    setRows(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    loadRows()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">User Reflections</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user_id}</td>
                <td>{r.message}</td>
                <td>{r.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
