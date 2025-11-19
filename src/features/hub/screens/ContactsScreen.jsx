/* eslint-disable no-unused-vars */
import React, { useState } from "react"
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

export default function ContactsScreen() {
  const { colors, spacing, radii, typography } = useTheme()

  // --- DEMO CONTACTS (Replace with CRUD later) ---
  const services = [
    {
      id: 1,
      name: "Healthline",
      desc: "24/7 free medical advice",
      phone: "0800611116",
      emoji: "🩺",
    },
    {
      id: 2,
      name: "Emergency Services",
      desc: "Call in life-threatening situations",
      phone: "111",
      emoji: "🚑",
    },
    {
      id: 3,
      name: "1737 – Need to Talk?",
      desc: "Free mental health support",
      phone: "1737",
      emoji: "💬",
    },
    {
      id: 4,
      name: "Quitline",
      desc: "Support to stop smoking",
      phone: "0800778778",
      emoji: "🚭",
    },
  ]

  const whanauContacts = [
    { id: 1, name: "Māmā", phone: "021 234 5678", emoji: "💚" },
    { id: 2, name: "Nan", phone: "027 555 8888", emoji: "🌺" },
    { id: 3, name: "Paora", phone: "021 777 9999", emoji: "🔥" },
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Contacts & Support</Text>
        <Text style={styles.subheading}>
          He waka eke noa — you are not alone on this journey.
        </Text>
      </Animated.View>

      {/* Support Services */}
      <Text style={styles.sectionTitle}>Support Services</Text>
      {services.map((service, idx) => (
        <Animated.View
          key={service.id}
          entering={FadeInUp.delay(200 + idx * 120).duration(500)}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            {service.emoji} {service.name}
          </Text>
          <Text style={styles.cardDesc}>{service.desc}</Text>

          <TouchableOpacity
            onPress={() => handleCall(service.phone)}
            style={styles.callButton}
          >
            <Text style={styles.callText}>Call {service.phone}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Whānau / Personal Contacts */}
      <Text style={styles.sectionTitle}>Whānau Support</Text>

      {whanauContacts.map((contact, idx) => (
        <Animated.View
          key={contact.id}
          entering={FadeInUp.delay(200 + idx * 80).duration(500)}
          style={[styles.card, { backgroundColor: colors.accent1 }]}
        >
          <Text style={styles.cardTitle}>
            {contact.emoji} {contact.name}
          </Text>

          <TouchableOpacity
            onPress={() => handleCall(contact.phone)}
            style={styles.callButtonLight}
          >
            <Text style={styles.callTextLight}>Call {contact.phone}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Add Contact (Demo Only) */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Contact (demo)</Text>
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
      marginBottom: spacing.xl,
    },

    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
      marginTop: spacing.md,
    },

    card: {
      backgroundColor: "#ffffff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 4,
      color: colors.text,
    },
    cardDesc: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.8,
      marginBottom: spacing.sm,
    },

    callButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: radii.md,
      alignItems: "center",
      marginTop: 6,
    },
    callText: {
      color: "#fff",
      fontFamily: typography.medium,
    },

    callButtonLight: {
      backgroundColor: "rgba(255,255,255,0.25)",
      padding: 10,
      borderRadius: radii.md,
      alignItems: "center",
      marginTop: 6,
    },
    callTextLight: {
      color: "#fff",
      fontFamily: typography.medium,
    },

    addButton: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.lg,
    },
    addButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
