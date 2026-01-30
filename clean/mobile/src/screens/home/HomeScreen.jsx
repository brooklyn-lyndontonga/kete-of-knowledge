/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { ScrollView } from 'react-native'
import { useState } from 'react'

import WhakataukiBanner from '../../components/home/WhakataukiBanner'
import HubShortcuts from '../../components/home/HubShortcuts'
import RemindersPreview from '../../components/home/RemindersPreview'

export default function HomeScreen({ navigation }) {
  // MVP: reminders can be empty or mocked
  const [reminders] = useState([])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
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
