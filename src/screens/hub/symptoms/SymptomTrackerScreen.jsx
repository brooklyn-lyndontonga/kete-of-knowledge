/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import Button from "../../components/Button"
import { globalStyles } from "../../theme/globalStyles"
import { useSymptoms } from "../hooks/useSymptoms"

export default function SymptomTrackerScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const conditionId = route.params?.conditionId ?? null

  const { addSymptom } = useSymptoms()

  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState("5")
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  )

  const handleSave = async () => {
    if (!symptom) return

    await addSymptom({
      symptom,
      severity: Number(severity),
      notes,
      conditionId,
      date: new Date(date).toISOString(),
    })

    navigation.goBack()
  }

  return (
    <PageShell>
      <Section title="Log a symptom">
        <Card>
          {conditionId && (
            <Text style={globalStyles.mutedText}>
              This symptom will be linked to the selected condition.
            </Text>
          )}

          {/* Symptom */}
          <Text style={globalStyles.label}>Symptom</Text>
          <TextInput
            value={symptom}
            onChangeText={setSymptom}
            placeholder="e.g. Headache, fatigue"
            style={globalStyles.input}
          />

          {/* Severity */}
          <Text style={globalStyles.label}>Severity (1–10)</Text>
          <TextInput
            value={severity}
            onChangeText={setSeverity}
            keyboardType="numeric"
            style={globalStyles.input}
          />

          {/* Date */}
          <Text style={globalStyles.label}>Date</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            style={globalStyles.input}
          />

          {/* Notes */}
          <Text style={globalStyles.label}>Notes (optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            style={[globalStyles.input, { height: 80 }]}
          />

          <Button label="Save symptom" onPress={handleSave} />
        </Card>
      </Section>
    </PageShell>
  )
}
