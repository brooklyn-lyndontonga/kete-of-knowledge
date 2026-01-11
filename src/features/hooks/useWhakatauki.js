import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useWhakatauki({ mode = "daily" } = {}) {
  const [whakatauki, setWhakatauki] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)

        const res = await fetch(`${API_URL}/whakatauki`)
        if (!res.ok) throw new Error("Failed to load whakataukī")

        const data = await res.json()
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No whakataukī available")
        }

        let selected

        if (mode === "random") {
          selected = data[Math.floor(Math.random() * data.length)]
        } else {
          // stable daily rotation
          const today = new Date().toISOString().slice(0, 10)
          const index =
            today.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) %
            data.length
          selected = data[index]
        }

        if (mounted) setWhakatauki(selected)
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
  }, [mode])

  return { whakatauki, loading, error }
}
