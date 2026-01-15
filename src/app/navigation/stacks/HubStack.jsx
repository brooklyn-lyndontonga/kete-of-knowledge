import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HubHomeScreen from "../../../features/hub/HubHomeScreen"
import SymptomsScreen from "../../../features/hub/SymptomsScreen"
import SymptomTrackerScreen from "../../../features/hub/SymptomTrackerScreen"
import ConditionListScreen from "../../../features/hub/ConditionListScreen"
import ConditionDetailScreen from "../../../features/hub/ConditionDetailScreen"
import MedicinesListScreen from "../../../features/hub/MedicinesListScreen"
import MedicineDetailScreen from "../../../features/hub/MedicineDetailScreen"
import RongoaScreen from "../../../features/hub/RongoaScreen"
import WriteReflectionScreen from "../../../features/hub/WriteReflectionScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Hub Home */}
      <Stack.Screen name="HubHome" component={HubHomeScreen} />

      {/* Symptoms */}
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
      <Stack.Screen name="SymptomTracker" component={SymptomTrackerScreen} />

      {/* Conditions */}
      <Stack.Screen name="ConditionList" component={ConditionListScreen} />
      <Stack.Screen name="ConditionDetail" component={ConditionDetailScreen} />

      {/* Medicines & Rongoā */}
      <Stack.Screen name="MedicinesList" component={MedicinesListScreen} />
      <Stack.Screen name="MedicineDetail" component={MedicineDetailScreen} />
      <Stack.Screen name="Rongoa" component={RongoaScreen} />

      {/* Reflections */}
      <Stack.Screen
        name="WriteReflection"
        component={WriteReflectionScreen}
      />
    </Stack.Navigator>
  )
}
