import { useState, useEffect } from "react"
import api from "../lib/api"

export function useSnapshots() {
  const [snapshots, setSnapshots] = useState([])

  async function loadSnapshots() {
    const res = await api.get("/snapshots")
    setSnapshots(res.data)
  }

  useEffect(() => {
    loadSnapshots()
  }, [])

  return { snapshots, reload: loadSnapshots }
}
