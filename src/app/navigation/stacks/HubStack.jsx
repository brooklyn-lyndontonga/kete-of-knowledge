import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import HubHomeScreen from '../../../features/hub/HubHomeScreen'
import GoalsScreen from '../../../features/hub/GoalsScreen'
import SymptomsScreen from '../../../features/hub/SymptomsScreen'
import SymptomTrackerScreen from '../../../features/hub/SymptomTrackerScreen'
import MyMedicinesScreen from '../../../features/hub/MyMedicinesScreen'
import MedicinesListScreen from '../../../features/hub/MedicinesListScreen'
import MedicineDetailScreen from '../../../features/hub/MedicineDetailScreen'
import ConditionListScreen from '../../../features/hub/ConditionListScreen'
import ConditionDetailScreen from '../../../features/hub/ConditionDetailScreen'
import ContactsScreen from '../../../features/hub/ContactsScreen'

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HubHome" component={HubHomeScreen} />

      <Stack.Screen name="HubGoals" component={GoalsScreen} />

      <Stack.Screen name="HubSymptoms" component={SymptomsScreen} />

      <Stack.Screen name="HubSymptomTracker" component={SymptomTrackerScreen} />

      <Stack.Screen name="HubMyMedicines" component={MyMedicinesScreen} />

      <Stack.Screen name="HubMedicinesList" component={MedicinesListScreen} />

      <Stack.Screen name="HubMedicineDetail" component={MedicineDetailScreen} />

      <Stack.Screen name="HubConditionList" component={ConditionListScreen} />

      <Stack.Screen
        name="HubConditionDetail"
        component={ConditionDetailScreen}
      />

      <Stack.Screen name="HubContacts" component={ContactsScreen} />
    </Stack.Navigator>
  )
}
