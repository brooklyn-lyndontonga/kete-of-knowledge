/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native'
import api from '../../lib/api'
import { useTheme } from '../../theme'

export default function MyMedicinesScreen() {
  const { colors } = useTheme()
  const [meds, setMeds] = useState([])
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    notes: '',
  })

  async function loadMeds() {
    try {
      const data = await api.get('/mymedicines')
      setMeds(data)
    } catch (err) {
      console.log('Error loading medicines:', err)
    }
  }

  async function addMed() {
    await api.post('/mymedicines', form)
    setForm({ name: '', dosage: '', frequency: '', notes: '' })
    loadMeds()
  }

  async function removeMed(id) {
    await api.delete(`/mymedicines/${id}`)
    loadMeds()
  }

  useEffect(() => {
    loadMeds()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Medicines</Text>

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medCard}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text>
              {item.dosage} — {item.frequency}
            </Text>
            <Button title="Delete" onPress={() => removeMed(item.id)} />
          </View>
        )}
      />

      <Text style={styles.subtitle}>Add Medicine</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />
      <TextInput
        placeholder="Dosage"
        style={styles.input}
        value={form.dosage}
        onChangeText={(t) => setForm({ ...form, dosage: t })}
      />
      <TextInput
        placeholder="Frequency"
        style={styles.input}
        value={form.frequency}
        onChangeText={(t) => setForm({ ...form, frequency: t })}
      />
      <TextInput
        placeholder="Notes"
        style={styles.input}
        value={form.notes}
        onChangeText={(t) => setForm({ ...form, notes: t })}
      />

      <Button title="Add Medicine" onPress={addMed} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  medCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  medName: { fontSize: 16, fontWeight: '600' },
  subtitle: { marginTop: 30, fontSize: 18, fontWeight: '700' },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
})
