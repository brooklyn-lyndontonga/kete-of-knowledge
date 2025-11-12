import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function NutritionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kai ā Nuku (Nutrition)</Text>
      <Text style={styles.text}>
        Whānau recipe cards and plate models will live here — celebrating kai and whenua.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 12 },
  text: { fontFamily: "Poppins_400Regular", lineHeight: 22 },
})
