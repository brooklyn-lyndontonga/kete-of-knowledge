/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"

const resources = [
  { id: "1", title: "Understanding Heart Health", summary: "A simple guide to caring for your manawa." },
  { id: "2", title: "Whānau Nutrition Tips", summary: "Practical advice for better kai and balance." },
]

export default function ResourceCategoryScreen({ route, navigation }) {
  const { category } = route.params || { category: "General" }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>

      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ResourceDetailScreen", { resource: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 22, color: "#267f53", marginBottom: 16 },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  title: { fontFamily: "Poppins_500Medium", fontSize: 16 },
  summary: { fontFamily: "Poppins_400Regular", color: "#555" },
})
