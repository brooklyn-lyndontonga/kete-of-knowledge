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

  const isArray = Array.isArray(snapshots)

  if (loading) return <p className="text-base-content/60">Loading snapshots…</p>
  if (error) return <p className="text-error">{error}</p>

  if (!isArray || snapshots.length === 0) {
    return <p className="text-base-content/60">No activity yet.</p>
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-0">
        <ul className="divide-y divide-base-200">
          {snapshots.slice(0, 5).map((s) => (
            <li key={s.id} className="p-4 hover:bg-base-200/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{s.mood}</div>
                  <div className="text-sm opacity-80">{s.energy} energy</div>
                </div>
                <div className="text-xs text-base-content/50">{new Date(s.createdAt).toLocaleDateString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
