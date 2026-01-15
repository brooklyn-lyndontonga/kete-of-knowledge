import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PageShell from '../../components/layout/PageShell'
import Section from '../../components/layout/Section'
import { globalStyles } from '../../theme/globalStyles'

import { useWhakatauki } from '../hooks/useWhakatauki'
import { useSymptoms } from '../hooks/useSymptoms'
import { useInsights } from '../hooks/useInsights'
import { useReflectionPrompts } from '../hooks/useReflectionPrompts'

import WhakataukiCard from '../../components/WhakataukiCard'
import InsightCard from '../insights/InsightCard'
import ReflectionPromptCard from '../reflections/ReflectionPromptCard'

export default function HomeScreen() {
  const navigation = useNavigation()

  const {
    whakatauki,
    loading: whakataukiLoading,
    error: whakataukiError,
  } = useWhakatauki()

  const { symptoms = [] } = useSymptoms()
  const insights = useInsights(symptoms)
  const reflectionPrompts = useReflectionPrompts(insights)

  return (
    <PageShell>
      {/* 🌿 Whakataukī */}
      <Section title="Whakataukī">
        {whakataukiLoading && (
          <Text style={globalStyles.mutedText}>
            Loading whakataukī…
          </Text>
        )}

        {whakataukiError && (
          <Text style={globalStyles.mutedText}>
            Unable to load whakataukī right now.
          </Text>
        )}

        {!whakataukiLoading && !whakataukiError && Array.isArray(whakatauki) && (
          <WhakataukiCard whakatauki={whakatauki} />
        )}
      </Section>

      {/* 🔍 Insights */}
      {insights.length > 0 && (
        <Section title="Noticing patterns">
          {insights.map((insight, idx) => (
            <InsightCard
              key={idx}
              message={insight.message}
            />
          ))}
        </Section>
      )}

      {/* ✍🏽 Reflection prompts */}
      {reflectionPrompts.length > 0 && (
        <Section title="A moment to reflect">
          {reflectionPrompts.map((p) => (
            <ReflectionPromptCard
              key={p.id}
              prompt={p.prompt}
              onPress={() =>
                navigation.navigate('Hub', {
                  screen: 'HubWriteReflection',
                  params: { prompt: p.prompt },
                })
              }
            />
          ))}
        </Section>
      )}

      {/* 🎯 Actions */}
      <Section title="What would you like to do today?">
        <TouchableOpacity
          style={{ marginBottom: 12 }}
          onPress={() => navigation.navigate('Hub')}
        >
          <Text style={globalStyles.linkText}>
            Track a symptom
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Library')}
        >
          <Text style={globalStyles.linkText}>
            Learn & understand
          </Text>
        </TouchableOpacity>
      </Section>
    </PageShell>
  )
}
