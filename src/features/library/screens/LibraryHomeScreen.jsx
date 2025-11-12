/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function LibraryHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Te Whare Rauemi (Library)</Text>
      <Text style={styles.sub}>Explore health knowledge and whānau stories</Text>

      {/* Search bar */}
      <TextInput style={styles.search} placeholder="Search resources..." />

      {/* Categories */}
      <View style={styles.grid}>
        {[
          { name: "Articles & Guides", target: "ResourceCategoryScreen" },
          { name: "Videos & Podcasts", target: "ResourceCategoryScreen" },
          { name: "Whānau Stories", target: "ResourceCategoryScreen" },
          { name: "Whakataukī", target: "WhakataukiScreen" },
          { name: "External Links", target: "ResourceCategoryScreen" },
        ].map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.tile}
            onPress={() => navigation.navigate(item.target, { category: item.name })}
          >
            <Text style={styles.tileText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 24, color: "#267f53" },
  sub: { fontFamily: "Poppins_400Regular", color: "#666", marginBottom: 20 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
    fontFamily: "Poppins_400Regular",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  tile: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  tileText: { fontFamily: "Poppins_500Medium", color: "#333", textAlign: "center" },
})
