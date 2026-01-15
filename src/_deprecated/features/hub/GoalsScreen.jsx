/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../lib/api' // your fetch wrapper

export default function GoalsScreen() {
  const navigation = useNavigation()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [newGoal, setNewGoal] = useState('')

  // Fetch demo data
  async function loadGoals() {
    try {
      const data = await api.get('/goals')
      setGoals(data)
    } catch (err) {
      console.error('Error loading goals:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  // Add new goal (demo – posts to backend)
  async function addGoal() {
    if (!newGoal.trim()) return

    try {
      await api.post('/goals', { title: newGoal })
      setNewGoal('')
      loadGoals()
    } catch (err) {
      console.error('Error adding goal:', err)
    }
  }

  async function deleteGoal(id) {
    try {
      await api.del(`/goals/${id}`)
      loadGoals()
    } catch (err) {
      console.error('Error deleting goal:', err)
    }
  }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#267f53" />
      </View>
    )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Goals</Text>

      {/* Add Goal */}
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={newGoal}
          onChangeText={setNewGoal}
          placeholder="Add a goal…"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addGoal}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.goalCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text style={styles.progressText}>
                Progress: {item.progress ?? 0}%
              </Text>
            </View>

            <TouchableOpacity onPress={() => deleteGoal(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F7F3',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#267f53',
    marginBottom: 20,
  },
  addRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: '#267f53',
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontWeight: '700' },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 13,
    marginTop: 4,
    color: '#777',
  },
  delete: {
    color: 'red',
    fontWeight: '700',
    paddingLeft: 12,
  },
})
