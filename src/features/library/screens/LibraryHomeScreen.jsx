import React from "react"
import { View, FlatList, ActivityIndicator, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useResourceCategories } from "../../hooks/useResourceCategories"

export default function LibraryHomeScreen() {
  const { categories, loading, error } = useResourceCategories()
  const navigation = useNavigation()

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ padding: 16 }}>
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
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}
