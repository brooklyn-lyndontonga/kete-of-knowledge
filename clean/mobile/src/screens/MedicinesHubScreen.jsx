 
 

import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native"
import { colors, layout, radii, shadow, spacing, typography, images } from "../theme"
import { useAuth } from "../auth/AuthContext"
import { useAuthGuard } from "../auth/useAuthGuard"

export default function MedicinesHubScreen({ navigation }) {
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  return (
    <View style={styles.container}>
      <View style={styles.headerCardContainer}>
        <ImageBackground 
          source={images.kawakawa_close} 
          style={styles.headerImageBg}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.kicker}>Rongoā Māori • Logger</Text>
            <Text style={styles.title}>Rongoā & Medicines</Text>
            <Text style={styles.subtitle}>
              Ensure heart health by keeping an accurate log of your daily medicine and traditional remedies.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.list}>
        {/* Card 1: Log a medicine */}
        <Pressable
          onPress={() => guard(() => navigation.navigate("AddMedicine"))}
          style={({ pressed }) => [
            styles.card,
            styles.primaryCard,
            (isGuest || pressed) && styles.cardPressed,
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Rārangi Rongoā</Text>
            <Text style={[styles.cardTitle, { color: colors.olive }]}>Log a medicine / rongoā</Text>
            <Text style={styles.cardDesc}>
              Quickly record when you took your heart medicines, aspirin, or traditional plant remedies.
            </Text>
          </View>
          <View style={[styles.actionCircle, { backgroundColor: colors.olive }]}>
            <Text style={styles.actionIcon}>+</Text>
          </View>
        </Pressable>

        {/* Card 2: Learn about medicines */}
        <Pressable
          onPress={() => navigation.navigate("Library")}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Pukapuka Rongoā</Text>
            <Text style={styles.cardTitle}>Learn about medicines</Text>
            <Text style={styles.cardDesc}>
              Understand cardiac medication interactions, guidelines, side effects, and safe traditional practices.
            </Text>
          </View>
          <View style={[styles.actionCircle, { backgroundColor: colors.russet }]}>
            <Text style={styles.actionIcon}>→</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: layout.screenPadding,
    gap: spacing.lg,
    backgroundColor: colors.cornsilk,
    flex: 1,
  },
  headerCardContainer: {
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  headerImageBg: {
    width: "100%",
  },
  headerImageStyle: {
    opacity: 0.95,
  },
  headerOverlay: {
    padding: spacing.lg,
    backgroundColor: "rgba(24, 38, 27, 0.55)", // Deep organic green overlay for high readability
    gap: 4,
  },
  kicker: {
    ...typography.caption,
    color: colors.camel,
    letterSpacing: 1.0,
    textTransform: "uppercase",
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
  },
  title: {
    ...typography.display,
    color: colors.white,
    fontSize: 25,
    lineHeight: 32,
    fontFamily: "Manrope_700Bold",
  },
  subtitle: {
    ...typography.body,
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 130,
  },
  primaryCard: {
    backgroundColor: "rgba(194, 168, 143, 0.08)", // Sand/clay tint background
    borderColor: "rgba(194, 168, 143, 0.18)",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  cardContent: {
    flex: 1,
    paddingRight: 40, // Keep space for the action circle
    gap: 3,
  },
  cardLabel: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 18,
    color: colors.text,
    fontFamily: "Manrope_700Bold",
  },
  cardDesc: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  actionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})
