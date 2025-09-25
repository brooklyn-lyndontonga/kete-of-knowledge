/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// import { createClient } from "@supabase/supabase-js"

// // These come from your .env file
// const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error("Missing Supabase credentials")
// }
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// export default supabase

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default supabase