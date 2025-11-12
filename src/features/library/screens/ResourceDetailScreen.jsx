/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function ResourceDetailScreen({ route }) {
  const { resource } = route.params || {
    resource: { title: "Resource Title", content: "Full article or guide text goes here." },
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{resource.title}</Text>
      <Text style={styles.body}>
        {resource.content || "This section will display the full content of the resource."}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 22, color: "#267f53", marginBottom: 16 },
  body: { fontFamily: "Poppins_400Regular", fontSize: 15, lineHeight: 24 },
})
