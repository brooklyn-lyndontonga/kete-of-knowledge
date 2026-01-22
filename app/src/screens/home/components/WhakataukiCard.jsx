/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { API_URL } from "../../../lib/api"
import { Text, Spacer } from "../../../ui"

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
      <Text variant="muted">
        He whakataukī mō tēnei rā 🌱
      </Text>
    )
  }

  return (
    <>
      <Text variant="body" style={{ fontStyle: "italic" }}>
        “{quote.text}”
      </Text>

      {quote.translation && (
        <>
          <Spacer size="sm" />
          <Text variant="muted">
            {quote.translation}
          </Text>
        </>
      )}
    </>
  )
}
