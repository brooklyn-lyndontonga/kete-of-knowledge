/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { TextInput } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"

import { useTheme } from "../../theme"

const CONDITIONS = [
  { id: "asthma", name: "Asthma", emoji: "🌬️", summary: "Breathing difficulties caused by airway inflammation." },
  { id: "diabetes", name: "Diabetes", emoji: "🩸", summary: "A condition affecting blood sugar levels." },
  { id: "hypertension", name: "High Blood Pressure", emoji: "🫀", summary: "When blood pressure is consistently elevated." },
  { id: "gout", name: "Gout", emoji: "🦵", summary: "A painful joint condition caused by uric acid buildup." },
  { id: "heart-disease", name: "Heart Disease", emoji: "❤️", summary: "Conditions affecting the heart and blood vessels." },
]

export default function ConditionListScreen({ navigation }) {
  const [search, setSearch] = useState("")
  const { spacing } = useTheme()

  const filtered = CONDITIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageShell>
      <Section title="Conditions" subtitle="Trusted information to support your hauora">
        <TextInput
          placeholder="Search conditions…"
          value={search}
          onChangeText={setSearch}
          style={{
            padding: spacing.md,
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: spacing.lg,
          }}
        />

        {filtered.map((cond, index) => (
          <Animated.View
            key={cond.id}
            entering={FadeInUp.delay(150 + index * 80)}
          >
            <Card
              onPress={() =>
                navigation.navigate("ConditionDetail", {
                  conditionId: cond.id,
                })
              }
            >
              <Card.Title>
                {cond.emoji} {cond.name}
              </Card.Title>
              <Card.Meta>{cond.summary}</Card.Meta>
            </Card>
          </Animated.View>
        ))}
      </Section>
    </PageShell>
  )
}
