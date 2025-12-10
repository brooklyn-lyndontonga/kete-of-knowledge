/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useAdminToast } from "../components/AdminToastProvider"
import * as resourcesApi from "../api/resources"

export default function LibraryPage() {
  const { showToast } = useAdminToast()

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      const data = await resourcesApi.fetchResources()
      setResources(data)
    } catch (err) {
      setError(err.message)
      showToast(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="page-container">
      <h1>Library Overview</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="list">
        {resources.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  )
}
