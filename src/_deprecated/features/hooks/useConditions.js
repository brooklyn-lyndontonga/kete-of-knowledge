import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useConditions() {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)

        const res = await fetch(`${API_URL}/conditions`)
        if (!res.ok) throw new Error("Failed to load conditions")

        const data = await res.json()
        if (mounted) setConditions(Array.isArray(data) ? data : [])
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

  return { conditions, loading, error }
}
