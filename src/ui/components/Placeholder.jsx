// src/ui/components/Placeholder.jsx
import React from "react"
import { View } from "react-native"
import Text from "./Text"
import Spacer from "./Spacer"
import Card from "./Card"
import { useTheme } from "../../app/providers/ThemeProvider"

export default function Placeholder({ title = "Coming Soon", body = "This feature is under development." }) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <Text variant="heading" style={{ marginBottom: theme.spacing.sm }}>
          {title}
        </Text>
        <Spacer size={theme.spacing.xs} />
        <Text color={theme.colors.mutedText}>{body}</Text>
      </Card>
    </View>
  )
}
