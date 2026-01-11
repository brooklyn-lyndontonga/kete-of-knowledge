import React from "react"
import { View, FlatList, ActivityIndicator, Text } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useResources } from "../../hooks/useResources"
import ResourceCard from "../components/ResourceCard"

export default function ResourceCategoryScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { categoryId } = route.params

  const { resources, loading, error } = useResources(categoryId)

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={resources}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ResourceCard
            resource={item}
            onPress={() =>
              navigation.navigate("ResourceDetail", { resource: item })
            }
          />
        )}
      />
    </View>
  )
}
