import "dotenv/config"

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "keteofknowledge",
    extra: {
      // Supabase (prefer EXPO_PUBLIC_* so values are baked at runtime)
      SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      // Accept publishable/anon under either var name
      SUPABASE_KEY:
        process.env.EXPO_PUBLIC_SUPABASE_KEY ||
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_KEY ||
        process.env.SUPABASE_ANON_KEY,

      // Dev helpers (no password login; just dev menu + mock sign-in)
      DEV_BYPASS: Number(process.env.EXPO_PUBLIC_DEV_BYPASS ?? 0),      // floating dev menu
      FORCE_SIGNED_IN: Number(process.env.EXPO_PUBLIC_FORCE_SIGNED_IN ?? 0), // mock full-app mode
      DEV_USER_MODE: (process.env.EXPO_PUBLIC_DEV_USER_MODE || "").toLowerCase(), // "first" | "returning" | ""

      eas: { projectId: "4682360a-ffa9-4a22-87ca-fceedc719c41" },
    },
    ios: { supportsTablet: true, bundleIdentifier: "com.brooklynlt24.my-app" },
    android: { edgeToEdgeEnabled: true },
    plugins: ["expo-font"],
  },
}
