import React from "react"
import { Text } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"

export default function LibraryGuideScreen() {
  return (
    <PageShell>
      <Section title="Library Guide">
        <Text>
          This guide helps you understand how to use the Library and find
          trustworthy information for your hauora.
        </Text>
      </Section>
    </PageShell>
  )
}
