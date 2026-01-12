import React from "react"
import { Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useSymptoms } from "../../hooks/useSymptoms"
import { useInsights } from "../../hooks/useInsights"

import PageShell from "../../../components/layout/PageShell"
import Section from "../../../components/layout/Section"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import InsightCard from "../../insights/InsightCard"
import { globalStyles } from "../../../theme/globalStyles"

export default function SymptomsScreen() {
  const navigation = useNavigation()
  const { symptoms, loading } = useSymptoms()
  const insights = useInsights(symptoms)

  return (
    <PageShell>
      {insights.length > 0 && (
        <Section title="Gentle insights">
          {insights.map((i, idx) => (
            <InsightCard key={idx} message={i.message} />
          ))}
        </Section>
      )}

      <Section title="Symptom tracker">
        <Card>
          <Button
            title="Add a check-in"
            onPress={() => navigation.navigate("SymptomTracker")}
          />
        </Card>
      </Section>

      <Section>
        {loading ? (
          <Text style={globalStyles.text}>Loading…</Text>
        ) : symptoms.length === 0 ? (
          <Text style={globalStyles.text}>
            No symptoms logged yet.
          </Text>
        ) : (
          <FlatList
            data={symptoms}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Card>
                <Text style={globalStyles.text}>{item.symptom}</Text>
                <Text style={globalStyles.mutedText}>
                  Severity: {item.severity}/10
                </Text>
                {item.notes ? (
                  <Text style={globalStyles.mutedText}>
                    {item.notes}
                  </Text>
                ) : null}
              </Card>
            )}
          />
        )}
      </Section>
    </PageShell>
  )
}
