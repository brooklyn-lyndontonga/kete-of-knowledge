import { useEffect, useState } from "react"
import Constants from "expo-constants"

const API_URL = Constants.expoConfig.extra.API_URL

export function useLatestSymptom() {
  const [latestSymptom, setLatestSymptom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${API_URL}/symptoms/latest`)
        const data = await res.json()
        setLatestSymptom(data?.[0] ?? null)
      } catch (error) {
        console.error("Failed to load latest symptom", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  return { latestSymptom, loading }
}
