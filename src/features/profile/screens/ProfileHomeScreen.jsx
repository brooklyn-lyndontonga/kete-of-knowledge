import React from "react"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../../components/layout/PageShell"
import Section from "../../../components/layout/Section"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import { globalStyles } from "../../../theme/globalStyles"

export default function ProfileHomeScreen() {
  const navigation = useNavigation()

  return (
    <PageShell>
      <Section title="Your profile">
        <Card>
          <Text style={globalStyles.text}>
            Manage your health info, goals, and whānau providers.
          </Text>
        </Card>
      </Section>

      <Section>
        <Card>
          <Button
            title="My goals"
            onPress={() => navigation.navigate("Goals")}
          />
        </Card>

        <Card>
          <Button
            title="My health providers"
            onPress={() => navigation.navigate("HealthProviders")}
          />
        </Card>

        <Card>
          <Button
            title="Data & privacy"
            onPress={() => navigation.navigate("DataSettings")}
          />
        </Card>
      </Section>
    </PageShell>
  )
}
