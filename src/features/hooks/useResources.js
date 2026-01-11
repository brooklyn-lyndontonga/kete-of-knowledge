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
        setLoading(true)

        const url = categoryId
          ? `${API_URL}/resources?categoryId=${categoryId}`
          : `${API_URL}/resources`

        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to load resources")

        const data = await res.json()
        if (mounted) setResources(Array.isArray(data) ? data : [])
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
  }, [categoryId])

  return { resources, loading, error }
}
