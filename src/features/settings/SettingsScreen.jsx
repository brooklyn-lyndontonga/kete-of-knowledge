import React, { useState } from "react"
import { Text, Switch, Alert, View } from "react-native"

// Layout & UI
import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import Button from "../../components/Button"

// Theme
import { colors } from "../../theme/theme"
import { globalStyles } from "../../theme/globalStyles"

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleLanguageToggle = () => {
    setLanguage(language === "English" ? "Te Reo Māori" : "English")
  }

  const handlePrivacy = () =>
    Alert.alert("Privacy & Consent", "Coming soon...")

  const handleHelp = () =>
    Alert.alert("Help & Feedback", "Coming soon...")

  const handleAbout = () =>
    Alert.alert(
      "About Kete of Knowledge",
      "Version 1.0 — Created with aroha and kaupapa Māori."
    )

  return (
    <PageShell>
      <Section title="Tautuhinga">
        <Card>
          <Text style={globalStyles.text}>
            Manage your preferences and app information.
          </Text>
        </Card>
      </Section>

      {/* Language */}
      <Section>
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={globalStyles.text}>Language / Reo</Text>
            <Button
              title={language}
              variant="secondary"
              onPress={handleLanguageToggle}
            />
          </View>
        </Card>
      </Section>

      {/* Notifications */}
      <Section>
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={globalStyles.text}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colors.divider,
                true: colors.success,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>
      </Section>

      {/* Actions */}
      <Section>
        <Card>
          <Button title="Privacy & consent" onPress={handlePrivacy} />
        </Card>

        <Card>
          <Button title="Help & feedback" onPress={handleHelp} />
        </Card>

        <Card>
          <Button title="About Kete of Knowledge" onPress={handleAbout} />
        </Card>
      </Section>

      {/* Footer */}
      <Section>
        <Card soft>
          <Text style={globalStyles.mutedText}>App version 1.0.0</Text>
          <Text style={globalStyles.mutedText}>
            Made with aroha in Aotearoa
          </Text>
        </Card>
      </Section>
    </PageShell>
  )
}
