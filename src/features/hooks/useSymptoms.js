import { useState, useEffect } from "react"
import api from "../lib/api"

export function useSymptoms() {
  const [symptoms, setSymptoms] = useState([])
  const [summary, setSummary] = useState(null)

  async function loadSymptoms() {
    const res = await api.get("/symptoms")
    setSymptoms(res.data)
  }

  async function loadSummary() {
    const res = await api.get("/symptoms/summary")
    setSummary(res.data)
  }

  async function addSymptom(data) {
    const res = await api.post("/symptoms", data)
    setSymptoms(prev => [...prev, res.data])
  }

  async function deleteSymptom(id) {
    await api.delete(`/symptoms/${id}`)
    setSymptoms(prev => prev.filter(s => s.id !== id))
  }

  useEffect(() => {
    loadSymptoms()
    loadSummary()
  }, [])

  return {
    symptoms,
    summary,
    addSymptom,
    deleteSymptom,
    reload: () => {
      loadSymptoms()
      loadSummary()
    }
  }
}
