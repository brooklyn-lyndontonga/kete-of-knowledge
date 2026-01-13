/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { FlatList, TextInput } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import Button from "../../components/Button"
import api from "../../lib/api"

export default function MyMedicinesScreen() {
  const [meds, setMeds] = useState([])
  const [form, setForm] = useState({ name: "", dosage: "", frequency: "" })

  useEffect(() => {
    loadMeds()
  }, [])

  async function loadMeds() {
    const data = await api.get("/mymedicines")
    setMeds(data)
  }

  return (
    <PageShell scroll={false}>
      <Section title="My Medicines">
        <FlatList
          data={meds}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Card>
              <Text>{item.name}</Text>
              <Text>{item.dosage} — {item.frequency}</Text>
            </Card>
          )}
        />
      </Section>

      <Section title="Add Medicine">
        <TextInput placeholder="Name" />
        <TextInput placeholder="Dosage" />
        <TextInput placeholder="Frequency" />
        <Button title="Add Medicine" />
      </Section>
    </PageShell>
  )
}
