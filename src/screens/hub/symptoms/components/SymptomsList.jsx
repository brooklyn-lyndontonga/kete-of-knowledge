/* eslint-disable react/react-in-jsx-scope */
import { View, Text, FlatList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { API_URL } from '../../../../lib/api'

export default function SymptomList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchSymptoms()
  }, [])

  async function fetchSymptoms() {
    const res = await fetch(`${API_URL}/symptoms`)
    const data = await res.json()
    setItems(data)
  }

  return (
    <View>
      <Text style={{ fontWeight: '600', marginBottom: 8 }}>History</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable>
            <Text>{item.symptom}</Text>
            <Text>Severity {item.severity}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}
