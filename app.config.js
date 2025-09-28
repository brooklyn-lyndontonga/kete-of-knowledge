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
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
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
