import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useSnapshots() {
  const [snapshots, setSnapshots] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/admin/snapshots`)
        const json = await res.json()
        setSnapshots(json)
      } catch (err) {
        console.error("Error loading snapshots:", err)
      }
    }
    load()
  }, [])

  return snapshots
}
