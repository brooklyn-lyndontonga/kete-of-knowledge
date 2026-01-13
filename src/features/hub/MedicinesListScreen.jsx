import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import api from '../../lib/api'
import { useNavigation } from '@react-navigation/native'

export default function MedicinesListScreen() {
  const [meds, setMeds] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    loadMeds()
  }, [])

  async function loadMeds() {
    try {
      const data = await api.get('/medicines')
      setMeds(data)
    } catch (error) {
      console.log('Error loading medicines:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Library</Text>

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('MedicineDetail', { id: item.id })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  card: {
    padding: 16,
    backgroundColor: '#eef2f7',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '600' },
  category: { fontSize: 14, color: '#555' },
})
