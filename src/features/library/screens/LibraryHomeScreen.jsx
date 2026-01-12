import React from "react"
import { FlatList, ActivityIndicator, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useResourceCategories } from "../../hooks/useResourceCategories"

import PageShell from "../../../components/layout/PageShell"
import Section from "../../../components/layout/Section"
import Card from "../../../components/Card"
import { globalStyles } from "../../../theme/globalStyles"

export default function LibraryHomeScreen() {
  const { categories, loading, error } = useResourceCategories()
  const navigation = useNavigation()

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <PageShell>
      <Section title="Learn at your pace">
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("ResourceCategory", {
                  categoryId: item.id,
                  title: item.name,
                })
              }
            >
              <Card>
                <Text style={globalStyles.text}>{item.name}</Text>
              </Card>
            </Pressable>
          )}
        />
      </Section>
    </PageShell>
  )
}
