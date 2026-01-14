import React from "react"
import { Text, Image } from "react-native"
import { useRoute } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import { globalStyles } from "../../theme/globalStyles"

export default function ResourceDetailScreen() {
  const { resource } = useRoute().params

  if (!resource) {
    return (
      <PageShell>
        <Text style={globalStyles.mutedText}>
          Resource not found.
        </Text>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Section title={resource.title}>
        {resource.image_url && (
          <Image
            source={{ uri: resource.image_url }}
            style={{
              height: 200,
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
        )}

        <Text style={globalStyles.text}>
          {resource.content}
        </Text>
      </Section>
    </PageShell>
  )
}
