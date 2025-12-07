import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useWhakatauki() {
  const [whakatauki, setWhakatauki] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIt() {
      try {
        const res = await fetch(`${API_URL}/admin/whakatauki/random`)
        const json = await res.json()
        setWhakatauki(json)
      } catch (err) {
        console.error("Error loading whakatauki:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchIt()
  }, [])

  return { whakatauki, loading }
}
