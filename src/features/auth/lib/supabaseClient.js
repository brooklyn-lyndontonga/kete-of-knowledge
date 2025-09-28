import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

// Prefer extra (from app.config.js), fall back to EXPO_PUBLIC_* (from .env)
const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};
const SUPABASE_URL = extra.SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// TEMP: one-time debug (remove after it works)
if (__DEV__) {
  console.log("Supabase config (debug):", {
    hasExtra: !!extra,
    urlFromExtra: !!extra.SUPABASE_URL,
    urlFromEnv: !!process.env.EXPO_PUBLIC_SUPABASE_URL,
  });
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
