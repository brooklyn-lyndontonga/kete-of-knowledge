// src/features/auth/lib/consent.js
import { supabase } from "./supabaseClient"
import AsyncStorage from "@react-native-async-storage/async-storage"

const key = (userId) => `consent:${userId}`

export async function markConsentLocalTemp() {
  // call this when user ticks the pre-auth checkbox (no userId yet)
  await AsyncStorage.setItem("consent:temp", JSON.stringify({
    consentAcceptedAt: new Date().toISOString()
  }))
}

export async function upsertConsentIfNeeded(userId) {
  try {
    const temp = await AsyncStorage.getItem("consent:temp")
    if (!temp) return
    const { consentAcceptedAt } = JSON.parse(temp) || {}
    await supabase.from("profiles").upsert({
      user_id: userId,
      consent_accepted_at: consentAcceptedAt || new Date().toISOString()
    }, { onConflict: "user_id" })
    await AsyncStorage.setItem(key(userId), temp)   // keep a per-user copy
    await AsyncStorage.removeItem("consent:temp")
  } catch (e) {
    console.error("consent sync failed", e)
  }
}
