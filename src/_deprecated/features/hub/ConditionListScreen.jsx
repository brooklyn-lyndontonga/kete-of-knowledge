import React from 'react'
import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useConditions } from '../hooks/useConditions'
import ConditionCard from './components/ConditionCard'

export default function ConditionListScreen() {
  const { conditions, loading, error } = useConditions()
  const navigation = useNavigation()

  if (loading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={conditions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ConditionCard
            condition={item}
            onPress={() =>
              navigation.navigate('ConditionDetail', {
                condition: item,
              })
            }
          />
        )}
      />
    </View>
  )
}
