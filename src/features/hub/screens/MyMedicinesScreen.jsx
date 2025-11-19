import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function MyMedicinesScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()

  // Fake Sprint-5 data
  const [medicines] = useState([
    {
      id: 1,
      name: "Metformin",
      dose: "500mg",
      schedule: "1x daily (morning)",
      nextTime: "8:00am",
    },
    {
      id: 2,
      name: "Levothyroxine",
      dose: "75mcg",
      schedule: "1x daily (morning)",
      nextTime: "7:30am",
    },
    {
      id: 3,
      name: "Vitamin D",
      dose: "1000IU",
      schedule: "Daily",
      nextTime: "Anytime",
    },
  ])

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>My Medicines</Text>
        <Text style={styles.subheading}>Your daily medication list</Text>
      </Animated.View>

      {/* Add new medicine */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MedicinesList")}
      >
        <Text style={styles.addButtonText}>+ Add Medicine</Text>
      </TouchableOpacity>

      {/* Medicine List */}
      {medicines.map((med, index) => (
        <Animated.View
          key={med.id}
          entering={FadeInUp.delay(index * 150).duration(500)}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MedicineDetail", { med })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={styles.dose}>{med.dose}</Text>
            </View>

            <Text style={styles.schedule}>{med.schedule}</Text>

            <Text style={styles.nextTime}>
              Next dose: {med.nextTime}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={{ height: spacing.xl * 2 }} />
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
    addButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      borderRadius: radii.lg,
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    addButtonText: {
      color: "white",
      fontFamily: typography.medium,
      fontSize: 16,
    },
    card: {
      backgroundColor: colors.accent1,
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    medName: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: colors.text,
    },
    dose: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
    },
    schedule: {
      fontFamily: typography.body,
      fontSize: 13,
      marginTop: 2,
    },
    nextTime: {
      fontFamily: typography.body,
      fontSize: 12,
      marginTop: 6,
      opacity: 0.7,
    },
  })
}
