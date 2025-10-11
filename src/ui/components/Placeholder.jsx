import React from "react"
import { View } from "react-native"
import Text from "./Text"
import Spacer from "./Spacer"
import Card from "./Card"
import { useTheme } from "../../app/providers/ThemeProvider"

export default function Placeholder({
  title = "Coming Soon",
  body = "This feature is under development.",
}) {
  const { theme } = useTheme() || {}

  // 🧩 Safe fallback in case theme is missing (e.g., dev bypass or early mount)
  const safeTheme = theme || {
    colors: { bg: "#fff", mutedText: "#555" },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16 },
  }

  return (
    <View
      style={{
        flex: 1,
        padding: safeTheme.spacing.lg,
        backgroundColor: safeTheme.colors.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <Text variant="heading" style={{ marginBottom: safeTheme.spacing.sm }}>
          {title}
        </Text>
        <Spacer size={safeTheme.spacing.xs} />
        <Text color={safeTheme.colors.mutedText}>{body}</Text>
      </Card>
    </View>
  )
}
