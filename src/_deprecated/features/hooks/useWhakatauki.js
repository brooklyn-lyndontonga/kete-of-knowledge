// import { useEffect, useState } from "react"
// import { API_URL } from "../../lib/api"

// export function useWhakatauki() {
//   const [whakatauki, setWhakatauki] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     let mounted = true

//     async function load() {
//       try {
//         const res = await fetch(`${API_URL}/api/whakatauki`)
//         if (!res.ok) throw new Error("Failed to load whakataukī")

//         const data = await res.json()
//         if (mounted) setWhakatauki(data)
//       } catch (err) {
//         if (mounted) setError(err.message)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }

//     load()
//     return () => (mounted = false)
//   }, [])

//   return { whakatauki, loading, error }
// }

import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export function useWhakatauki() {
  const [whakatauki, setWhakatauki] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/whakatauki`)
        if (!res.ok) throw new Error("Failed to load")

        const data = await res.json()
        if (mounted) setWhakatauki(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => (mounted = false)
  }, [])

  return { whakatauki, loading, error }
}
