import React from "react"
import { ActivityIndicator, Text } from "react-native"

// Layout & UI
import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import WhakataukiCard from "../../components/WhakataukiCard"

// Hooks (✅ FIXED PATH)
import { useWhakatauki } from "../hooks/useWhakatauki"

export default function WhakataukiScreen() {
  const { whakatauki, loading, error } = useWhakatauki({ mode: "random" })

  if (loading) {
    return (
      <PageShell>
        <ActivityIndicator />
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <Text>{error}</Text>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Section title="Whakataukī">
        <WhakataukiCard quote={whakatauki} />
      </Section>
    </PageShell>
  )
}
