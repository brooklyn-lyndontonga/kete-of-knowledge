import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useResourceCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch(`${API_URL}/resourceCategories`)
        if (!res.ok) throw new Error("Failed to load categories")

        const data = await res.json()
        if (mounted) setCategories(Array.isArray(data) ? data : [])
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

  return { categories, loading, error }
}

