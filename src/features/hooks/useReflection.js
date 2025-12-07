import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useReflectionTile() {
  const [tile, setTile] = useState(null)

  useEffect(() => {
    async function loadTile() {
      try {
        const res = await fetch(`${API_URL}/reflections/latest`)
        const json = await res.json()
        setTile(json)
      } catch (err) {
        console.log("Error loading reflection tile:", err)
      }
    }

    loadTile()
  }, [])

  return tile
}
