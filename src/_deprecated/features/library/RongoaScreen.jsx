/* eslint-disable no-undef */
import React from "react"
import Animated, { FadeInUp } from "react-native-reanimated"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"

export default function RongoaScreen() {
  return (
    <PageShell>
      <Section
        title="Rongoā Māori"
        subtitle="He taonga tuku iho — traditional healing knowledge"
      >
        {RONGOA_ITEMS.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInUp.delay(150 + index * 100)}
          >
            <Card>
              <Card.Title>
                {item.emoji} {item.name}
              </Card.Title>
              <Card.Meta>{item.snippet}</Card.Meta>
            </Card>
          </Animated.View>
        ))}
      </Section>
    </PageShell>
  )
}
