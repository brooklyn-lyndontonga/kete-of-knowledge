/* eslint-disable no-undef */
import { supabase } from "./supabaseClient"
import AsyncStorage from "@react-native-async-storage/async-storage"

export async function upsertConsentIfNeeded(userId) {
  try {
    const localKey = `consent:${userId}`
    const local = await AsyncStorage.getItem(localKey)
    if (!local) return // user didn’t accept? (shouldn’t happen with our gate)
    const { consentAcceptedAt } = JSON.parse(local)

    // upsert profile with consent time
    await supabase.from("profiles").upsert(
      {
        user_id: userId,
        consent_accepted_at: consentAcceptedAt ?? new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
  } catch (e) {
    console.error("consent sync failed", e)
  }
}

export async function markConsentLocal(userId) {
  await AsyncStorage.setItem(
    `consent:${userId}`,
    JSON.stringify({
      consentAcceptedAt: new Date().toISOString(),
    })
  )
}
