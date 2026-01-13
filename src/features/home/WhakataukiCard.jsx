/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { apiGet } from "../utils/api"
import { useEffect, useState } from "react"

export default function WhakataukiCard() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    apiGet("/whakatauki/random")
      .then((res) => setQuote(res))
      .catch(() => setQuote(null))
  }, [])

  if (!quote) return <Text>Loading…</Text>

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{quote.text}</Text>
      {quote.translation && (
        <Text style={styles.translation}>{quote.translation}</Text>
      )}
    </View>
  )
}
