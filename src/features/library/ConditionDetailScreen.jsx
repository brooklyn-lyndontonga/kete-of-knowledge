/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react"
import { Text } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"

import { useTheme } from "../../theme"

export default function ConditionDetailScreen({ route }) {
  const { conditionId } = route.params
  const { spacing } = useTheme()

  const condition = CONDITION_DETAILS[conditionId]
  if (!condition) {
    return (
      <PageShell>
        <Section>
          <Text>Condition not found.</Text>
        </Section>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Section title={`${condition.emoji} ${condition.name}`}>
        <Text style={{ marginBottom: spacing.lg }}>
          {condition.overview}
        </Text>

        {condition.sections.map((section, idx) => (
          <Animated.View
            key={idx}
            entering={FadeInUp.delay(200 + idx * 120)}
          >
            <Card>
              <Card.Title>{section.heading}</Card.Title>
              <Card.Meta>{section.text}</Card.Meta>
            </Card>
          </Animated.View>
        ))}
      </Section>
    </PageShell>
  )
}
