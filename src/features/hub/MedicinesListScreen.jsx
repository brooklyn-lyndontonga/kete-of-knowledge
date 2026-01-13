import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import api from "../../lib/api"

export default function MedicinesListScreen() {
  const [meds, setMeds] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    loadMeds()
  }, [])

  async function loadMeds() {
    const data = await api.get("/medicines")
    setMeds(data)
  }

  return (
    <PageShell scroll={false}>
      <Section title="Medicine Library">
        <FlatList
          data={meds}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MedicineDetail", { id: item.id })
              }
            >
              <Card>
                <Text>{item.name}</Text>
                <Text style={{ opacity: 0.6 }}>{item.category}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </Section>
    </PageShell>
  )
}
