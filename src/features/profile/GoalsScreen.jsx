/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import { globalStyles } from "../../theme/globalStyles"

import { API_URL } from "../../lib/api"

export default function GoalsScreen() {
  const [goals, setGoals] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadGoals() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/user/goals`)
      if (!res.ok) throw new Error("Failed to load goals")
      const data = await res.json()
      setGoals(data)
    } catch (err) {
      setError("Unable to load goals.")
    } finally {
      setLoading(false)
    }
  }

  async function addGoal() {
    if (!text.trim()) return

    try {
      await fetch(`${API_URL}/api/user/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text }),
      })

      setText("")
      loadGoals()
    } catch {
      setError("Unable to save goal.")
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  return (
    <PageShell>
      <Section title="Goals">
        {loading && <ActivityIndicator />}
        {error && <Text style={globalStyles.mutedText}>{error}</Text>}

        {!loading && goals.length === 0 && (
          <Text style={globalStyles.mutedText}>
            You haven’t added any goals yet.
          </Text>
        )}

        {goals.map((goal) => (
          <Card key={goal.id}>
            <Text style={globalStyles.text}>{goal.title}</Text>
          </Card>
        ))}

        <Card>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Add a new goal…"
            style={globalStyles.input}
          />

          <TouchableOpacity onPress={addGoal}>
            <Text style={globalStyles.linkText}>Save goal</Text>
          </TouchableOpacity>
        </Card>
      </Section>
    </PageShell>
  )
}
