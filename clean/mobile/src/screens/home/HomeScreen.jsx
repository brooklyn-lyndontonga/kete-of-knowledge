/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { useState } from 'react'

import WhakataukiBanner from '../../components/home/WhakataukiBanner'
import HubShortcuts from '../../components/home/HubShortcuts'
import RemindersPreview from '../../components/home/RemindersPreview'
import { colors, layout, spacing, typography } from '../../theme'

export default function HomeScreen({ navigation }) {
  // MVP: reminders can be empty or mocked
  const [reminders] = useState([])

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.hero}>
        <Text style={styles.kicker}>Heart Health</Text>
        <Text style={styles.title}>Ngākau Ora</Text>
        <Text style={styles.subtitle}>
          Care for your heart, your whānau, and your daily rhythm.
        </Text>
      </View>
      {/* 🌿 Grounding */}
      <WhakataukiBanner
        text="He aha te mea nui o te ao?"
        translation="What is the most important thing in the world?"
      />

      {/* 🧭 Navigation shortcuts */}
      <HubShortcuts
        onNavigate={(item) => {
          if (item === 'Symptoms') navigation.navigate('SymptomsHub')
          if (item === 'Rongoā') navigation.navigate('MedicinesHub')
          if (item === 'Notes') navigation.navigate('Hub')
          if (item === 'Checklists') navigation.navigate('Hub')
        }}
      />

      {/* ⏰ Reminders */}
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
  hero: {
    gap: spacing.xs,
  },
  kicker: {
    ...typography.caption,
    color: colors.russet,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  title: {
    ...typography.display,
    color: colors.olive,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
})
