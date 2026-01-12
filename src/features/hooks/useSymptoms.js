import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useSymptoms(conditionId = null) {
  const [symptoms, setSymptoms] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchSymptoms() {
    try {
      const url = conditionId
        ? `${API_URL}/symptoms?conditionId=${conditionId}`
        : `${API_URL}/symptoms`

      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch symptoms")

      const data = await res.json()
      setSymptoms(data)
    } catch (err) {
      console.error("Error loading symptoms:", err)
    } finally {
      setLoading(false)
    }
  }

  async function addSymptom(symptom) {
    try {
      const res = await fetch(`${API_URL}/symptoms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(symptom),
      })

      if (!res.ok) throw new Error("Failed to add symptom")
      await fetchSymptoms()
    } catch (err) {
      console.error("Error adding symptom:", err)
    }
  }

  useEffect(() => {
    fetchSymptoms()
  }, [conditionId])

  return {
    symptoms,
    loading,
    addSymptom,
  }
}
