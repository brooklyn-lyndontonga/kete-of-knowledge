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
        console.log("📡 Fetching categories from:", `${API_URL}/api/library`)

        const res = await fetch(`${API_URL}/api/library`)
        if (!res.ok) throw new Error("Failed to load library categories")

        const data = await res.json()

        if (mounted) {
          setCategories(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error("❌ Failed to load resource categories:", err)
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
