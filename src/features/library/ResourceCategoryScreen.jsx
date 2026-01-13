import React from "react"
import { FlatList, ActivityIndicator, Text } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResources } from "../hooks/useResources"

export default function ResourceCategoryScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const categoryId = route.params?.categoryId

  const { resources, loading, error } = useResources(categoryId)

  if (!categoryId) {
    return (
      <PageShell>
        <Text>Missing category</Text>
      </PageShell>
    )
  }

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <PageShell scroll={false}>
      <Section title="Resources">
        <FlatList
          data={resources}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ResourceCard
              title={item.title}
              summary={item.summary}
              onPress={() => {
                console.log("🟢 PRESSED resource:", item.id)
                navigation.navigate("ResourceDetail", { resource: item })
              }}
            />
          )}
        />
      </Section>
    </PageShell>
  )
}
