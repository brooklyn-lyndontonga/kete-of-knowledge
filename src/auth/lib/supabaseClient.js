/* eslint-disable no-undef */
// src/features/auth/lib/supabaseClient.js
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// Load from Expo env or fallback
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠️ Supabase URL or key missing from environment.')
}

// Create the client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
