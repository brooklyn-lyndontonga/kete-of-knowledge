/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { API_URL } from "../../../lib/api"

export default function WhakataukiCard() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchWhakatauki() {
      try {
        const res = await fetch(`${API_URL}/whakatauki/daily`)
        const data = await res.json()

        if (isMounted && data?.text) {
          setQuote(data)
        }
      } catch (err) {
        console.warn("Failed to load whakataukī", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchWhakatauki()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  if (!quote) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontStyle: "italic", color: "#666" }}>
          He whakataukī mō tēnei rā 🌱
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontSize: 16, fontStyle: "italic" }}>
        “{quote.text}”
      </Text>

      {quote.translation && (
        <Text style={{ marginTop: 8, color: "#555" }}>
          {quote.translation}
        </Text>
      )}
    </View>
  )
}
