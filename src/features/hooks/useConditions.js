import { useEffect, useState } from "react"
import { API_URL } from "../lib/api"

export function useConditions() {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      const res = await fetch(`${API_URL}/conditions`)
      const data = await res.json()
      setConditions(data)
    } catch (err) {
      console.log("Error loading conditions:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { conditions, loading, reload: load }
}
