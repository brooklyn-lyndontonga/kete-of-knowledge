/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { ActivityIndicator, Text, FlatList } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResources } from "../hooks/useResources"

export default function ResourceCategoryScreen() {
  const route = useRoute()
  const navigation = useNavigation()

  // ✅ THIS is the critical line
  const { categoryId, title } = route.params

  console.log("🧭 route params:", route.params)

  const { resources, loading, error } = useResources(categoryId)

  if (loading) {
    return (
      <PageShell>
        <Text>Loading resources…</Text>
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
    <PageShell scroll={false}>
      <Section title={title}>
        {resources.length === 0 ? (
          <Text style={{ opacity: 0.6 }}>
            No resources yet for this category.
          </Text>
        ) : (
          <FlatList
            data={resources}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ResourceCard
                title={item.title}
                summary={item.content}
                onPress={() =>
                  navigation.navigate("ResourceDetail", {
                    resource: item,
                  })
                }
              />
            )}
          />
        )}
      </Section>
    </PageShell>
  )
}
