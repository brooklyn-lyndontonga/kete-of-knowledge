import React from "react"
import { Text, Image } from "react-native"
import { useRoute } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"

export default function ResourceDetailScreen() {
  const { resource } = useRoute().params

  return (
    <PageShell>
      <Section title={resource.title}>
        {resource.image && (
          <Image
            source={{ uri: resource.image }}
            style={{ height: 200, borderRadius: 12, marginBottom: 16 }}
          />
        )}
        <Text>{resource.summary}</Text>
      </Section>
    </PageShell>
  )
}
