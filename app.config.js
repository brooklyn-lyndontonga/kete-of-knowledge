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
      // Prefer EXPO_PUBLIC_* so values are inlined for the app at runtime
      SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
      DEV_BYPASS: Number(process.env.EXPO_PUBLIC_DEV_BYPASS ?? 1), // 1=on in dev by default
      eas: { projectId: "4682360a-ffa9-4a22-87ca-fceedc719c41" }
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.brooklynlt24.my-app"
    },
    android: { edgeToEdgeEnabled: true },
    plugins: ["expo-font"]
  }
}
