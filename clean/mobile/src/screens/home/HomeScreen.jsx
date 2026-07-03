import { ScrollView, Text, View, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useAuth } from '../../auth/AuthContext'

import WhakataukiBanner from '../../components/home/WhakataukiBanner'
import HubShortcuts from '../../components/home/HubShortcuts'
import RemindersPreview from '../../components/home/RemindersPreview'
import { fetchWhakatauki } from '../../api/appApi'
import { getReminders } from '../../features/reminders.db.js'
import { colors, layout, radii, shadow, spacing, typography, images } from '../../theme'

// Shown until the API responds, and whenever the client hasn't published any
const FALLBACK_WHAKATAUKI = {
  text: 'He aha te mea nui o te ao? He tangata, he tangata, he tangata.',
  translation:
    'What is the most important thing in the world? It is people, it is people, it is people.',
}

// Rotate deterministically by day so everyone sees the same "daily" proverb
function pickDaily(list) {
  if (!Array.isArray(list) || list.length === 0) return null
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / 86400000)
  return list[dayOfYear % list.length]
}

export default function HomeScreen({ navigation }) {
  const { session, isAuthenticated } = useAuth()
  const isFocused = useIsFocused()

  const userName =
    isAuthenticated && session?.user?.name
      ? session.user.name.split(' ')[0]
      : 'Whānau'

  const userInitial =
    isAuthenticated && session?.user?.email
      ? session.user.email.charAt(0).toUpperCase()
      : 'W'

  const [whakatauki, setWhakatauki] = useState(FALLBACK_WHAKATAUKI)
  const [reminders, setReminders] = useState([])

  // Daily reflection — now pulled from the admin-managed content
  useEffect(() => {
    fetchWhakatauki()
      .then((list) => {
        const daily = pickDaily(list)
        if (daily?.text) setWhakatauki(daily)
      })
      .catch((err) => {
        // Offline or server down — the fallback proverb stays up
        console.warn('Could not load whakataukī:', err?.message)
      })
  }, [])

  // Upcoming reminders — refresh whenever Home regains focus
  const loadReminders = useCallback(async () => {
    try {
      const rows = await getReminders()
      const active = (rows || []).filter((r) => r.active)
      // Map schedule → time, since RemindersPreview renders item.time
      setReminders(
        active.slice(0, 3).map((r) => ({ ...r, time: r.schedule }))
      )
    } catch (err) {
      console.warn('Could not load reminders:', err?.message)
    }
  }, [])

  useEffect(() => {
    if (isFocused) loadReminders()
  }, [isFocused, loadReminders])

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 🌿 Personalized Hero Card with Kauri Forest Backdrop */}
      <View style={styles.heroCardContainer}>
        <ImageBackground
          source={images.kauri_giant_tree}
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
              accessibilityRole="button"
              accessibilityLabel="Open your profile"
            >
              <Text style={styles.avatarLetter}>{userInitial}</Text>
              <View style={styles.avatarOnlineDot} />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      {/* 🌿 Daily Reflection — admin-managed, rotates daily */}
      <WhakataukiBanner
        text={whakatauki.text}
        translation={whakatauki.translation}
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
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  heroImageBg: {
    width: '100%',
  },
  heroImageStyle: {
    opacity: 0.95,
  },
  heroOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: 'rgba(24, 38, 27, 0.52)', // Deep organic green overlay for high readability
  },
  heroText: {
    flex: 1,
    gap: 3,
  },
  kicker: {
    ...typography.caption,
    color: colors.camel, // Soft sand accent kicker
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
  },
  title: {
    ...typography.display,
    color: colors.white, // Pop in pure white on dark backdrop
    fontSize: 25,
    lineHeight: 32,
    fontFamily: 'Manrope_700Bold',
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.85)', // Readable soft white description
    fontSize: 15,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.22)', // Translucent card integration
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    marginLeft: spacing.md,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
  },
  avatarOnlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.laurel,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
})
