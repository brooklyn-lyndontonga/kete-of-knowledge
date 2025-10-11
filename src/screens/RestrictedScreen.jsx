// src/screens/RestrictedScreen.jsx
import React from "react"
import { View } from "react-native"
import Text from "../ui/components/Text"
import Card from "../ui/components/Card"
import Spacer from "../ui/components/Spacer"
import Button from "../ui/components/Button"
import { useTheme } from "../app/providers/ThemeProvider"
import { useNavigation, useRoute } from "@react-navigation/native"

export default function RestrictedScreen() {
  const { theme } = useTheme() || {}
  const nav = useNavigation()
  const route = useRoute()
  const { cta } = route.params || {}

  // ✅ Fallback theme in case provider isn’t ready
  const safeTheme = theme || {
    colors: { bg: "#fff", mutedText: "#666" },
    spacing: { sm: 8, md: 12, lg: 16 },
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: safeTheme.colors.bg,
        padding: safeTheme.spacing.lg,
      }}
    >
      <Card>
        <Text
          variant="heading"
          style={{ marginBottom: safeTheme.spacing.md, textAlign: "center" }}
        >
          Locked Feature 🔒
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: safeTheme.colors.mutedText,
            marginBottom: safeTheme.spacing.lg,
          }}
        >
          {cta ||
            "You’ll need to sign in to access this feature. Please log in to continue."}
        </Text>

        <Button title="Sign In" onPress={() => nav.navigate("EmailSignIn")} />
      </Card>
    </View>
  )
}
