/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function ConditionDetailScreen({ route }) {
  const { condition } = route.params || { condition: { name: "Condition Name" } }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{condition.name}</Text>
      <Text style={styles.text}>
        This page will display bilingual information about {condition.name}, including causes,
        symptoms, and management tips grounded in te ao Māori.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#267f53", marginBottom: 12 },
  text: { fontFamily: "Poppins_400Regular", lineHeight: 22 },
})
