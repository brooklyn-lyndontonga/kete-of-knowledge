import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HubScreen from "../../../screens/hub/HubScreen"
import SymptomsListScreen from "../../../screens/hub/symptoms/SymptomsListScreen"
import LogSymptomScreen from "../../../screens/hub/symptoms/LogSymptomScreen"
import MedicinesScreen from "../../../screens/hub/medicines/MedicinesScreen"
import ChecklistScreen from "../../../screens/hub/checklist/ChecklistScreen"
import NotesScreen from "../../../screens/hub/notes/NotesScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HubHome" component={HubScreen} />
      <Stack.Screen name="Symptoms" component={SymptomsListScreen} />
      <Stack.Screen name="LogSymptom" component={LogSymptomScreen} />
      <Stack.Screen name="Medicines" component={MedicinesScreen} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  )
}
