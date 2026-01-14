import React from "react"
import { Text } from "react-native"
import { useRoute } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import { globalStyles } from "../../theme/globalStyles"

export default function ConditionDetailScreen() {
  const route = useRoute()
  const condition = route.params?.condition

  // 🛑 Safety: no condition passed
  if (!condition) {
    return (
      <PageShell>
        <Section title="Condition">
          <Text style={globalStyles.mutedText}>
            Condition details are unavailable.
          </Text>
        </Section>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Section title={condition.name}>
        <Card>
          {condition.description ? (
            <Text style={globalStyles.text}>
              {condition.description}
            </Text>
          ) : (
            <Text style={globalStyles.mutedText}>
              No description available.
            </Text>
          )}
        </Card>
      </Section>
    </PageShell>
  )
}
