import React from "react"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../../components/layout/PageShell"
import Section from "../../../components/layout/Section"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import Tracker from "../../../components/Tracker"

export default function HubHomeScreen() {
  const navigation = useNavigation()

  return (
    <PageShell>
      <Section title="Taku Manawa">
        <Tracker
          title="How does your manawa feel today?"
          description="You can check in whenever it feels right."
        />
      </Section>

      <Section title="Your health tools">
        <Card>
          <Button
            title="Log symptoms"
            onPress={() => navigation.navigate("Symptoms")}
          />
        </Card>

        <Card>
          <Button
            title="Manage conditions"
            onPress={() => navigation.navigate("ManageConditions")}
          />
        </Card>
      </Section>
    </PageShell>
  )
}
