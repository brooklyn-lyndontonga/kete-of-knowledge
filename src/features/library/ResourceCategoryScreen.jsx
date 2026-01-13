import React from "react"
import { ActivityIndicator, Text } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"

import { useResources } from "../hooks/useResources"


export default function ResourceCategoryScreen() {
  const { categoryId } = useRoute().params
  const navigation = useNavigation()
  const { resources, loading, error } = useResources(categoryId)

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <PageShell>
      <Section title="Resources">
        {resources.map((item) => (
          <ResourceCard
            key={item.id}
            resource={item}
            onPress={() =>
              navigation.navigate("ResourceDetail", { resource: item })
            }
          />
        ))}
      </Section>
    </PageShell>
  )
}
