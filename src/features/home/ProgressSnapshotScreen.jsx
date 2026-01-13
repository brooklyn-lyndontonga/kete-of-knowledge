import React from 'react'
import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import { useSnapshots } from '../hooks/useSnapshots'
import ProgressSnapshotCard from './components/ProgressSnapshotCard'

export default function ProgressSnapshotScreen() {
  const { snapshots, loading, error } = useSnapshots()

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={snapshots}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProgressSnapshotCard snapshot={item} />}
      />
    </View>
  )
}
