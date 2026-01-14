/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react"
import { FlatList, ActivityIndicator, Text } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResources } from "../hooks/useResources"

export default function ResourceCategoryScreen() {
  console.log("🟢 ResourceCategoryScreen mounted")

  const route = useRoute()
  console.log("🧭 route params:", route.params)


  const navigation = useNavigation()
  const { resources, loading, error } = useResources(categoryId)

  if (!loading && resources.length === 0) {
  return (
    <PageShell>
      <Section title="Resources">
        <Text>No resources found for this category yet.</Text>
      </Section>
    </PageShell>
  )
}


  // return (
  //   <PageShell>
  //     <Text style={{ color: "red", marginBottom: 16 }}>
  //       ResourceCategoryScreen is rendering
  //     </Text>

  //     <Section title="Resources">
  //       {loading && <Text>Loading…</Text>}
  //       {error && <Text>Error: {error}</Text>}

  //       {resources?.length === 0 && (
  //         <Text>No resources found for this category.</Text>
  //       )}

  //       {resources?.map((item) => (
  //         <ResourceCard
  //           key={item.id}
  //           title={item.title}
  //           onPress={() =>
  //             navigation.navigate("ResourceDetail", { resource: item })
  //           }
  //         />
  //       ))}
  //     </Section>
  //   </PageShell>
  // )
}
