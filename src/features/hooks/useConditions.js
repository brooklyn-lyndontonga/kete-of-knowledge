import { useState, useEffect } from "react"
import api from "../lib/api"

export function useConditions() {
  const [conditions, setConditions] = useState([])

  async function loadConditions() {
    const res = await api.get("/conditions")
    setConditions(res.data)
  }

  async function getCondition(id) {
    const res = await api.get(`/conditions/${id}`)
    return res.data
  }

  useEffect(() => {
    loadConditions()
  }, [])

  return { conditions, getCondition, reload: loadConditions }
}
