import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HubScreen from '../../screens/hub/HubScreen'
import ConditionsScreen from '../../screens/hub/ConditionsScreen'
import ConditionDetailScreen from '../../screens/hub/ConditionDetailScreen'
import SymptomTrackerScreen from '../../screens/hub/SymptomTrackerScreen'
import MedicinesScreen from '../../screens/hub/MedicinesScreen'

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Hub" component={HubScreen} />
      <Stack.Screen name="Conditions" component={ConditionsScreen} />
      <Stack.Screen name="ConditionDetail" component={ConditionDetailScreen} />
      <Stack.Screen name="SymptomTracker" component={SymptomTrackerScreen} />
      <Stack.Screen name="Medicines" component={MedicinesScreen} />
    </Stack.Navigator>
  )
}
