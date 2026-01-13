/* eslint-disable no-undef */
import "dotenv/config"

export default {
  expo: {
    name: "Kete of Knowledge",
    slug: "kete-of-knowledge",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "keteofknowledge",

   extra: {
      API_URL: "http://10.1.1.145:3000",

      SUPABASE_URL:
        process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,

      SUPABASE_KEY:
        process.env.EXPO_PUBLIC_SUPABASE_KEY ||
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_KEY ||
        process.env.SUPABASE_ANON_KEY,

      eas: {
        projectId: "4682360a-ffa9-4a22-87ca-fceedc719c41",
      },
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.brooklynlt24.my-app",
    },

    android: {
      edgeToEdgeEnabled: true,
    },

    plugins: ["expo-font"],
  },
}
