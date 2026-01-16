import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HubScreen from "../../../screens/hub/HubScreen"
import SymptomsScreen from "../../../screens/hub/symptoms/SymptomsScreen"
import LogSymptomScreen from "../../../screens/hub/symptoms/LogSymptomScreen"
import MedicinesScreen from "../../../screens/hub/MedicinesScreen"
import ChecklistScreen from "../../../screens/hub/ChecklistScreen"


const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HubHome" component={HubScreen} />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
      <Stack.Screen name="LogSymptom" component={LogSymptomScreen} />
      <Stack.Screen name="Medicines" component={MedicinesScreen} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} />
    </Stack.Navigator>
  )
}
