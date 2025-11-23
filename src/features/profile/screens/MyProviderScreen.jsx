 
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation } from "@react-navigation/native"

export default function MyProvidersScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  // Demo provider data (replace with CRUD later)
  const providers = [
    {
      id: 1,
      name: "Dr. Smith",
      role: "General Practitioner",
      clinic: "Hauora Tairāwhiti Clinic",
      phone: "06 867 1234",
      emoji: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Nurse Kelly",
      role: "Nurse Specialist",
      clinic: "Gisborne Medical Centre",
      phone: "06 868 4455",
      emoji: "🩺",
    },
    {
      id: 3,
      name: "Cardiology Team",
      role: "Heart Specialist Unit",
      clinic: "Waikato Hospital",
      phone: "07 834 8888",
      emoji: "❤️",
    },
  ]

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(500)}>
        <Text style={styles.heading}>My Health Providers</Text>
        <Text style={styles.subheading}>
          Your hauora team — here to support your journey.
        </Text>
      </Animated.View>

      {/* Provider List */}
      <Text style={styles.sectionTitle}>Registered Providers</Text>

      {providers.map((p, idx) => (
        <Animated.View
          key={p.id}
          entering={FadeInUp.delay(150 + idx * 120).duration(500)}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ProviderDetail", { provider: p })}
          >
            <Text style={styles.cardTitle}>
              {p.emoji} {p.name}
            </Text>
            <Text style={styles.cardSub}>{p.role}</Text>
            <Text style={styles.cardSub}>{p.clinic}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCall(p.phone)}
            style={styles.callButton}
          >
            <Text style={styles.callText}>Call {p.phone}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Add Provider Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ProviderDetail", { provider: null })}
      >
        <Text style={styles.addText}>Add New Provider (demo)</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingTop: 60,
      paddingHorizontal: spacing.lg,
    },

    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      opacity: 0.8,
      marginBottom: spacing.xl,
    },

    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: spacing.md,
      marginTop: spacing.md,
      color: colors.text,
    },

    card: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: 4,
      color: colors.text,
    },
    cardSub: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.7,
    },

    callButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      borderRadius: radii.md,
      marginTop: spacing.md,
      alignItems: "center",
    },
    callText: {
      color: "#fff",
      fontFamily: typography.medium,
    },

    addButton: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.xl,
    },
    addText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
