import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useLatestSymptom() {
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${API_URL}/symptoms`)
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setLatest(data[data.length - 1])
        }
      } catch (e) {
        console.error("❌ Failed to load latest symptom", e)
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  return { latest, loading }
}
