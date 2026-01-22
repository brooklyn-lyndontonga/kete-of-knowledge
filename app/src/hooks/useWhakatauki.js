import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../lib/api"

const STORAGE_KEY = "daily_whakatauki"

export function useWhakatauki() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWhakatauki() {
      try {
        // 1️⃣ Load cached first
        const cached = await AsyncStorage.getItem(STORAGE_KEY)
        if (cached) {
          setQuote(JSON.parse(cached))
        }

        // 2️⃣ Fetch latest from API
        const res = await fetch(
          `${API_URL}/admin/reflection-templates/latest`
        )
        const data = await res.json()

        if (data) {
          const formatted = {
            text: data.prompt,
            attribution: data.title,
          }

          setQuote(formatted)
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(formatted)
          )
        }
      } catch (err) {
        console.warn("⚠️ Failed to load whakataukī", err)
      } finally {
        setLoading(false)
      }
    }

    loadWhakatauki()
  }, [])

  return { quote, loading }
}
