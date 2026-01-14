import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useResources(categoryId) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categoryId) return

    async function load() {
      try {
        const res = await fetch(
          `${API_URL}/api/library/${categoryId}/resources`
        )

        if (!res.ok) throw new Error("Failed to load resources")

        const data = await res.json()
        setResources(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [categoryId])

  return { resources, loading, error }
}
