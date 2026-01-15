import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useLatestSymptom() {
  const [latest, setLatest] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/symptoms`)
        const data = await res.json()
        if (data?.length) {
          setLatest(data[0])
        }
      } catch (err) {
        console.warn("⚠️ Failed to load latest symptom", err)
      }
    }

    load()
  }, [])

  return latest
}
