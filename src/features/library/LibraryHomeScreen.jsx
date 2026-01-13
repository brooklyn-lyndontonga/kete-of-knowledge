import React from "react"
import { FlatList, ActivityIndicator, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResourceCategories } from "../hooks/useResourceCategories"
import { globalStyles } from "../../theme/globalStyles"

export default function LibraryHomeScreen() {
  const navigation = useNavigation()
  const { categories, loading, error } = useResourceCategories()

  if (loading) {
    return (
      <PageShell scroll={false}>
        <ActivityIndicator />
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell scroll={false}>
        <Text style={globalStyles.text}>{error}</Text>
      </PageShell>
    )
  }

  return (
    <PageShell scroll={false}>
      <Section title="Library">
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <ResourceCard
              title={item.name}
              onPress={() =>
                navigation.navigate("ResourceCategory", {
                  categoryId: item.id,
                  title: item.name,
                })
              }
            />
          )}
        />
      </Section>
    </PageShell>
  )
}
