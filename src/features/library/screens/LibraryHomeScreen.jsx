import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import Header from "../../../ui/components/Header"
import SearchBar from "../components/SearchBar"
import ResourceCard from "../components/ResourceCard"
import { useNavigation } from "@react-navigation/native"

export default function LibraryHomeScreen() {
  const navigation = useNavigation()
  const [query, setQuery] = useState("")

  const categories = [
    { title: "Articles & Guides", route: "ResourceCategoryScreen", icon: "📘", filter: "articles" },
    { title: "Videos & Podcasts", route: "ResourceCategoryScreen", icon: "🎧", filter: "media" },
    { title: "Pūrākau & Stories", route: "ResourceCategoryScreen", icon: "🌿", filter: "stories" },
    { title: "Whakataukī", route: "WhakataukiScreen", icon: "✨" },
    { title: "External Links", route: "ResourceCategoryScreen", icon: "🔗", filter: "external" },
  ]

  const sampleResources = [
    { id: 1, title: "Understanding Blood Pressure", category: "articles", summary: "A simple guide to reading your numbers.", route: "ResourceDetailScreen" },
    { id: 2, title: "Ngā Kōrero mō te Kai Hauora", category: "stories", summary: "A pūrākau about kai and connection to whenua.", route: "ResourceDetailScreen" },
  ]

  const filteredResources = sampleResources.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <ScrollView style={styles.container}>
      <Header title="Te Puna Mātauranga" subtitle="Library & Resources" />

      <SearchBar value={query} onChangeText={setQuery} placeholder="Search resources..." />

      <Text style={styles.sectionTitle}>Browse Categories</Text>
      <View style={styles.categoryGrid}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.categoryTile}
            onPress={() => navigation.navigate(cat.route, { filter: cat.filter })}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryText}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Resources</Text>
      {filteredResources.map((res) => (
        <ResourceCard
          key={res.id}
          title={res.title}
          summary={res.summary}
          onPress={() => navigation.navigate(res.route, { id: res.id })}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: "#333",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryTile: {
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    width: "47%",
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  categoryText: {
    textAlign: "center",
    fontSize: 14,
  },
})
