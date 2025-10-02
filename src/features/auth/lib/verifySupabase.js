// src/features/auth/lib/verifySupabase.js
import { supabase } from "./supabaseClient"

export async function verifySupabase() {
  // HEAD-style select: just checks that the request + auth stack works
  const { count, error, status } = await supabase
    .from("profiles")
    .select("user_id", { head: true, count: "exact" }) // no data, just metadata

  if (error) {
    // Distinguish "bad key" vs "policy" vs other
    if (/invalid api key/i.test(error.message)) {
      console.warn("❌ Invalid API key (check .env / app.config.js)")
    } else if (/permission|denied|policy/i.test(error.message)) {
      console.log("✅ Key accepted, but RLS/policy blocks SELECT on profiles (expected in many setups).")
    } else {
      console.warn("⚠️ Request reached Supabase but errored:", error.message, { status })
    }
    return { ok: false, status, error }
  }

  console.log("✅ Supabase reachable; status:", status, "count:", count)
  return { ok: true, status, count }
}
