/* eslint-disable no-undef */
// src/auth/supabaseClient.js
import { createClient } from "@supabase/supabase-js"

// Don’t use process.env directly in Expo, it won’t work.
// Instead, read from app.json → extra, or hard-code for now while testing.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("⚠️ Supabase URL or anon key is missing!")
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
