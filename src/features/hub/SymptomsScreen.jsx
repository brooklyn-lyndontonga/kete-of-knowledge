/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
export default function SymptomsScreen() {
  const navigation = useNavigation()
  const { symptoms, loading } = useSymptoms()
  const insights = useInsights(symptoms)

  return (
    <PageShell scroll={false}>
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

      <Section title="History">
        {loading ? (
          <Text>Loading…</Text>
        ) : (
          <FlatList
            data={symptoms}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <Card>
                <Text>{item.symptom}</Text>
                <Text>Severity: {item.severity}/10</Text>
                {item.notes && <Text>{item.notes}</Text>}
              </Card>
            )}
          />
        )}
      </Section>
    </PageShell>
  )
}
