import { createClient } from "@supabase/supabase-js"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

const extra = Constants?.expoConfig?.extra ?? {}

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || extra.SUPABASE_URL

const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || extra.SUPABASE_ANON_KEY

if (!SUPABASE_URL) throw new Error("supabaseUrl is required")
if (!SUPABASE_ANON_KEY) throw new Error("supabaseAnonKey is required")

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
})
