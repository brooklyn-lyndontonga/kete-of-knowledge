import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ConditionsScreen() {
  const navigation = useNavigation()

  // Later this list will come from local storage or DB
  const conditions = [
    { id: 1, name: 'High Blood Pressure', key: 'HighBP' },
    { id: 2, name: 'High Cholesterol', key: 'HighCholesterol' },
    { id: 3, name: 'Angina', key: 'Angina' },
    { id: 4, name: 'Diabetes', key: 'Diabetes' },
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Conditions</Text>
      <Text style={styles.subtitle}>
        Tap a condition below to learn more or manage your symptoms.
      </Text>

      <View style={styles.list}>
        {conditions.map((condition) => (
          <TouchableOpacity
            key={condition.id}
            style={styles.item}
            onPress={() =>
              navigation.navigate('ConditionDetail', { condition: condition })
            }
          >
            <Text style={styles.itemTitle}>{condition.name}</Text>
            <Text style={styles.itemText}>View details and recommendations</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#267f53',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  list: {
    gap: 16,
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#444',
  },
})

