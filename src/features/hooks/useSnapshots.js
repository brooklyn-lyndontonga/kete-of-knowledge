import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useSnapshots() {
  const [snapshots, setSnapshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)

        const res = await fetch(`${API_URL}/snapshots`)
        if (!res.ok) throw new Error("Failed to load snapshots")

        const data = await res.json()
        if (mounted) setSnapshots(Array.isArray(data) ? data : [])
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return { snapshots, loading, error }
}
