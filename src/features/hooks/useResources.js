import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useResources(categoryId) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch(
          `${API_URL}/api/library/${categoryId}/resources`
        )
        if (!res.ok) throw new Error("Failed to load resources")

        const data = await res.json()
        if (mounted) setResources(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => (mounted = false)
  }, [categoryId])

  return { resources, loading, error }
}
