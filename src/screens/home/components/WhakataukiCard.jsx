/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../../../lib/api"


const CACHE_KEY = "daily_whakatauki"
const CACHE_DATE_KEY = "daily_whakatauki_date"

export default function WhakataukiCard() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWhakatauki()
  }, [])

  async function loadWhakatauki() {
    try {
      const today = new Date().toDateString()
      const cachedDate = await AsyncStorage.getItem(CACHE_DATE_KEY)
      const cachedQuote = await AsyncStorage.getItem(CACHE_KEY)

      // ✅ Use cache if already fetched today
      if (cachedDate === today && cachedQuote) {
        setQuote(JSON.parse(cachedQuote))
        setLoading(false)
        return
      }

      // 🌐 Fetch from backend
      const res = await fetch(
        `${API_URL}/admin/whakatauki/latest`
      )
      const data = await res.json()

      setQuote(data)

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data))
      await AsyncStorage.setItem(CACHE_DATE_KEY, today)
    } catch (err) {
      console.warn("⚠️ Whakataukī fetch failed, using fallback")

      if (cachedQuote) {
        setQuote(JSON.parse(cachedQuote))
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <ActivityIndicator />
  }

  if (!quote) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontStyle: "italic", color: "#666" }}>
          He whakataukī mō tēnei rā ka tae mai ākuanei 🌱
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

      {quote.attribution && (
        <Text style={{ marginTop: 8, fontSize: 12, textAlign: "right" }}>
          — {quote.attribution}
        </Text>
      )}
    </View>
  )
}
