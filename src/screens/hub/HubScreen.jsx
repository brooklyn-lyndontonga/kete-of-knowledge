import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function HubScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Taku Manawa</Text>
      <Text style={styles.subtitle}>Manage your health and wellbeing in one place</Text>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Conditions')}
        >
          <Text style={styles.cardTitle}>My Conditions</Text>
          <Text style={styles.cardText}>Track and learn about your health conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('SymptomTracker')}
        >
          <Text style={styles.cardTitle}>Symptom Tracker</Text>
          <Text style={styles.cardText}>Record and review your symptoms weekly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Medicines')}
        >
          <Text style={styles.cardTitle}>My Medicines</Text>
          <Text style={styles.cardText}>Keep track of your medications and supplements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Text style={styles.cardTitle}>Contacts & Support</Text>
          <Text style={styles.cardText}>Access your GP, whānau, and care connections</Text>
        </TouchableOpacity>
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
    color: '#267f53', // matches your theme
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  section: {
    gap: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
})
