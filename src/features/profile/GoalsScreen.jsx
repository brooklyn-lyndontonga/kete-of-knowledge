/* eslint-disable no-unused-vars */
import React from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import Button from "../../components/Button"

const sampleGoals = [
  { id: "1", title: "Walk 3× per week", whakatauki: "Mā te huruhuru ka rere te manu" },
  { id: "2", title: "Drink more water", whakatauki: "He wai kei aku kamo" },
]

export default function GoalsScreen() {
  return (
    <PageShell scroll={false}>
      <Section title="Ngā Whāinga (Goals)">
        <FlatList
          data={sampleGoals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Card>
              <Text>{item.title}</Text>
              <Text style={{ opacity: 0.6 }}>{item.whakatauki}</Text>
            </Card>
          )}
        />

        <Button title="＋ Add Goal" onPress={() => {}} />
      </Section>
    </PageShell>
  )
}
