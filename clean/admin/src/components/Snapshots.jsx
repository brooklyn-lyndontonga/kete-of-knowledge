/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchSnapshots } from "../api/content.api"

export default function SnapshotsOverview() {
  const [snapshots, setSnapshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSnapshots()
        setSnapshots(data || [])
      } catch (err) {
        setError("Failed to load snapshots")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <p>Loading snapshots…</p>
  if (error) return <p className="text-muted">{error}</p>

  if (snapshots.length === 0) {
    return <p className="text-muted">No activity yet.</p>
  }

  return (
    <div className="border rounded-md divide-y">
      {snapshots.slice(0, 5).map((s) => (
        <div key={s.id} className="p-3 text-sm">
          <strong>{s.mood}</strong> · {s.energy}
          <div className="text-muted">{s.createdAt}</div>
        </div>
      ))}
    </div>
  )
}
