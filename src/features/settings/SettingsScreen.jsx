import React from "react"
import { Switch, Text } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import { useTheme } from "../../theme"

export default function SettingsScreen() {
  const { colors } = useTheme()

  return (
    <PageShell>
      <Section title="Settings">
        <Card row>
          <Text style={{ color: colors.text }}>Notifications</Text>
          <Switch />
        </Card>

        <Card row>
          <Text style={{ color: colors.text }}>Dark mode</Text>
          <Switch />
        </Card>
      </Section>
    </PageShell>
  )
}
