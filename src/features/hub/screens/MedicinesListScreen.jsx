import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function MedicinesListScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()

  const [search, setSearch] = useState("")

  // Demo medicine catalogue (Sprint-5 placeholder)
  const medicines = [
    { id: 1, name: "Metformin", type: "Diabetes" },
    { id: 2, name: "Levothyroxine", type: "Thyroid" },
    { id: 3, name: "Vitamin D", type: "Supplement" },
    { id: 4, name: "Ibuprofen", type: "Pain Relief" },
    { id: 5, name: "Paracetamol", type: "Pain Relief" },
    { id: 6, name: "Amlodipine", type: "Blood Pressure" },
    { id: 7, name: "Omeprazole", type: "Stomach" },
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>

      {/* Heading */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>Medicines</Text>
        <Text style={styles.subheading}>Browse the medicine catalogue</Text>
      </Animated.View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search medicines…"
          placeholderTextColor={colors.textLight}
          style={styles.searchInput}
        />
      </View>

      {/* Medicine Items */}
      {medicines.map((med, i) => (
        <Animated.View
          key={med.id}
          entering={FadeInUp.delay(i * 120).duration(500)}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MedicineDetail", { med })}
          >
            <Text style={styles.medName}>{med.name}</Text>
            <Text style={styles.medType}>{med.type}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.textLight,
      marginTop: 4,
      marginBottom: spacing.lg,
    },
    searchContainer: {
      marginBottom: spacing.lg,
    },
    searchInput: {
      backgroundColor: "white",
      padding: spacing.md,
      borderRadius: radii.lg,
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.accent1,
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.sm,
    },
    medName: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: colors.text,
    },
    medType: {
      fontFamily: typography.body,
      opacity: 0.75,
      marginTop: 4,
      fontSize: 12,
    },
  })
}
