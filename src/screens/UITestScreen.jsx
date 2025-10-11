import React from "react"
import { View } from "react-native"
import { Button, Card, Spacer, Placeholder, Text } from "../ui"
import { useTheme } from "../app/providers/ThemeProvider"

export default function UITestScreen() {
  const { theme } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg,
        padding: theme.spacing.lg,
      }}
    >
      <Text variant="heading" style={{ marginBottom: theme.spacing.md }}>
        UI Kit Demo
      </Text>

      <Card>
        <Text>Card component working ✅</Text>
      </Card>

      <Spacer size={theme.spacing.md} />

      <Button title="Press Me ✅" onPress={() => alert("Button works!")} />

      <Spacer size={theme.spacing.md} />

      <Placeholder title="Placeholder Component" body="This is placeholder content." />
    </View>
  )
}
