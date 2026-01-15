import React from "react"
import { FlatList, ActivityIndicator, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"
import { useResourceCategories } from "../hooks/useResourceCategories"

export default function LibraryHomeScreen() {
  const navigation = useNavigation()
  const { categories, loading, error } = useResourceCategories()

  return (
    <PageShell scroll={false}>
      <Section title="Library">
        {loading && <ActivityIndicator />}

        {error && (
          <Text style={{ opacity: 0.7 }}>
            Unable to load library right now.
          </Text>
        )}

        {!loading && !error && (
          <FlatList
            data={categories}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
             <ResourceCard
  title={item.name}
  onPress={() => {
    console.log("🟢 PRESSED category:", item.id)
    navigation.navigate("ResourceCategory", {
      categoryId: item.id,
      title: item.name,
    })
  }}
/>

            )}
          />
        )}
      </Section>
    </PageShell>
  )
}
