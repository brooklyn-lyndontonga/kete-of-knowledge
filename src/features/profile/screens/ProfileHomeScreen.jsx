import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function ProfileHomeScreen() {
  const navigation = useNavigation()
  const { colors, spacing, typography } = useTheme()

  const styles = createStyles(colors, spacing, typography)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>
      <Text style={styles.subheading}>
        Manage your health info, goals, and whānau providers.
      </Text>

      {/* Quick Actions */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Goals")}
      >
        <Text style={styles.cardTitle}>🎯 My Goals</Text>
        <Text style={styles.cardDesc}>Track your health and wellbeing goals.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("HealthProviders")}
      >
        <Text style={styles.cardTitle}>🏥 My Health Providers</Text>
        <Text style={styles.cardDesc}>View and manage your clinicians.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DataSettings")}
      >
        <Text style={styles.cardTitle}>🔐 Data & Privacy</Text>
        <Text style={styles.cardDesc}>Control what information you share.</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      backgroundColor: colors.bg,
      paddingTop: 60,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.textLight,
      marginBottom: spacing.xl,
      marginTop: 4,
    },
    card: {
      backgroundColor: colors.card,
      padding: spacing.lg,
      borderRadius: 14,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: 4,
    },
    cardDesc: {
      fontFamily: typography.body,
      fontSize: 13,
      color: colors.textLight,
    },
  })
}
