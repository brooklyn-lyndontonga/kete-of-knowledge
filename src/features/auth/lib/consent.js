/* src/features/auth/lib/consent.js */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { supabase } from "./supabaseClient"

export async function upsertConsentIfNeeded(userId) {
  const tmp = await AsyncStorage.getItem("consent:temp")
  if (!tmp) return
  const { consentAcceptedAt } = JSON.parse(tmp)
  const { data: profile } = await supabase
    .from("profiles")
    .select("consent_accepted_at")
    .eq("user_id", userId)
    .maybeSingle()

  if (!profile?.consent_accepted_at) {
    await supabase.from("profiles").upsert({
      user_id: userId,
      consent_accepted_at: consentAcceptedAt || new Date().toISOString(),
    })
  }
  await AsyncStorage.removeItem("consent:temp")
}
