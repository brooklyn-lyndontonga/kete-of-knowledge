import { createClient } from "@supabase/supabase-js"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

const extra = Constants?.expoConfig?.extra ?? {}

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  extra.SUPABASE_URL

const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  extra.SUPABASE_KEY

if (!SUPABASE_URL) throw new Error("supabaseUrl is required")
if (!SUPABASE_KEY) throw new Error("supabaseKey is required")

// Optional: one-time visibility in dev
if (__DEV__) {
  console.log("Supabase runtime:", { url: SUPABASE_URL, keyLen: (SUPABASE_KEY || "").length })
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Expo handles deep links
  },
})
