import React from "react"
import { FlatList, Text, ActivityIndicator } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResources } from "../hooks/useResources"
import { globalStyles } from "../../theme/globalStyles"

export default function ResourceCategoryScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { categoryId, title } = route.params

  const { resources, loading, error } = useResources(categoryId)

  return (
    <PageShell scroll={false}>
      <Section title={title || "Resources"}>
        {loading && <ActivityIndicator />}

        {error && (
          <Text style={globalStyles.mutedText}>
            Unable to load resources right now.
          </Text>
        )}

        {!loading && !error && resources.length === 0 && (
          <Text style={globalStyles.mutedText}>
            No resources available yet.
          </Text>
        )}

        {!loading && !error && resources.length > 0 && (
          <FlatList
            data={resources}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
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
