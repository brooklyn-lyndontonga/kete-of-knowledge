import React from "react"
import { ActivityIndicator, Text } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"

// ✅ CORRECT IMPORT (from Library)
import ResourceCard from "../library/components/ResourceCard"

import { useResources } from "../hooks/useResources"

export default function RongoaScreen() {
  // If you want a fixed category, use the Rongoā category ID
  const RONGOA_CATEGORY_ID = 1

  const { resources, loading, error } = useResources(RONGOA_CATEGORY_ID)

  return (
    <PageShell>
      <Section title="Rongoā Māori">
        {loading && <ActivityIndicator />}

        {error && (
          <Text style={{ opacity: 0.6 }}>
            Unable to load rongoā right now.
          </Text>
        )}

        {!loading && !error && resources.length === 0 && (
          <Text style={{ opacity: 0.6 }}>
            No rongoā content available yet.
          </Text>
        )}

        {!loading &&
          !error &&
          resources.map((item) => (
            <ResourceCard
              key={item.id}
              resource={item}
              onPress={() => {}}
            />
          ))}
      </Section>
    </PageShell>
  )
}
