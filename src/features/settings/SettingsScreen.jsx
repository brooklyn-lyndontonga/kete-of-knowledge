/* eslint-disable no-unused-vars */
import React from "react"
import { Switch, Text, View } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import { useTheme } from "../../app/providers/ThemeProvider"


export default function SettingsScreen() {
  const { colors, spacing } = useTheme()

  return (
    <PageShell>
      <Section title="Settings">
        {/* Notifications */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              Notifications
            </Text>
            <Switch />
          </View>
        </Card>

        {/* Dark mode */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              Dark mode
            </Text>
            <Switch />
          </View>
        </Card>
      </Section>
    </PageShell>
  )
}
