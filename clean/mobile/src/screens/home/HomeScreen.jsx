 
 

import { ScrollView, Text, View, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'

import WhakataukiBanner from '../../components/home/WhakataukiBanner'
import HubShortcuts from '../../components/home/HubShortcuts'
import RemindersPreview from '../../components/home/RemindersPreview'
import { colors, layout, radii, shadow, spacing, typography, images } from '../../theme'

export default function HomeScreen({ navigation }) {
  const { session, isAuthenticated } = useAuth()
  
  // Extract user's name if authenticated, default to "Whānau"
  const userName = isAuthenticated && session?.user?.name 
    ? session.user.name.split(' ')[0] 
    : "Whānau"

  // Check if we have an email letter for fallback avatar
  const userInitial = isAuthenticated && session?.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : "W"

  const [reminders] = useState([])

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 🌿 Personalized Hero Card with Kauri Forest Backdrop */}
      <View style={styles.heroCardContainer}>
        <ImageBackground 
          source={images.kauriForest} 
          style={styles.heroImageBg}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroText}>
              <Text style={styles.kicker}>Kia Ora & Welcome</Text>
              <Text style={styles.title}>Rise & shine, {userName}!</Text>
              <Text style={styles.subtitle}>How do you feel today?</Text>
            </View>
            <Pressable 
              style={styles.avatarCircle}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.avatarLetter}>{userInitial}</Text>
              <View style={styles.avatarOnlineDot} />
            </Pressable>
          </View>
        </ImageBackground>
      </View>


      {/* 🌿 Daily Reflection */}
      <WhakataukiBanner
        text="He aha te mea nui o te ao? He tangata, he tangata, he tangata."
        translation="What is the most important thing in the world? It is people, it is people, it is people."
      />

      {/* 🧭 Interactive tools grid */}
      <HubShortcuts
        onNavigate={(item) => {
          if (item === 'Symptoms') navigation.navigate('SymptomsHub')
          if (item === 'Rongoā') navigation.navigate('MedicinesHub')
          if (item === 'Notes') navigation.navigate('Hub')
          if (item === 'Checklists') navigation.navigate('Hub')
        }}
      />

      {/* ⏰ Reminders / Care Calendar */}
      <RemindersPreview
        items={reminders}
        onAdd={() => navigation.navigate('Hub')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: layout.screenPadding,
    gap: spacing.lg,
    paddingBottom: 40,
  },
  heroCardContainer: {
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  heroImageBg: {
    width: "100%",
  },
  heroImageStyle: {
    opacity: 0.95,
  },
  heroOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: "rgba(24, 38, 27, 0.52)", // Deep organic green overlay for high readability
  },
  heroText: {
    flex: 1,
    gap: 3,
  },
  kicker: {
    ...typography.caption,
    color: colors.camel, // Soft sand accent kicker
    letterSpacing: 1.0,
    textTransform: "uppercase",
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
  },
  title: {
    ...typography.display,
    color: colors.white, // Pop in pure white on dark backdrop
    fontSize: 25,
    lineHeight: 32,
    fontFamily: "Manrope_700Bold",
  },
  subtitle: {
    ...typography.body,
    color: "rgba(255, 255, 255, 0.85)", // Readable soft white description
    fontSize: 15,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.22)", // Translucent card integration
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    marginLeft: spacing.md,
  },
  avatarLetter: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
  },
  avatarOnlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.laurel,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
})

