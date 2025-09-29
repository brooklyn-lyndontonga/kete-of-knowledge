// src/features/profile/lib/api.js
import { supabase } from "../../auth/lib/supabaseClient"
import { getRole } from "../../../app/auth/capabilities"
import { useAuth } from "../../../app/providers/AuthProvider"

export async function getMyProfile(user) {
  if (getRole(user) === "guest") return null
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()
  if (error) throw error
  return data
}
