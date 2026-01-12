import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HubHomeScreen from "../../../features/hub/screens/HubHomeScreen"
import GoalsScreen from "../../../features/hub/screens/GoalsScreen"
import SymptomsScreen from "../../../features/hub/screens/SymptomsScreen"
import SymptomTrackerScreen from "../../../features/hub/screens/SymptomTrackerScreen"
import MyMedicinesScreen from "../../../features/hub/screens/MyMedicinesScreen"
import MedicinesListScreen from "../../../features/hub/screens/MedicinesListScreen"
import MedicineDetailScreen from "../../../features/hub/screens/MedicineDetailScreen"
import ConditionListScreen from "../../../features/hub/screens/ConditionListScreen"
import ConditionDetailScreen from "../../../features/hub/screens/ConditionDetailScreen"
import ContactsScreen from "../../../features/hub/screens/ContactsScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HubHome"
        component={HubHomeScreen}
      />

      <Stack.Screen
        name="Goals"
        component={GoalsScreen}
      />

      <Stack.Screen
        name="Symptoms"
        component={SymptomsScreen}
      />
      <Stack.Screen
        name="SymptomTracker"
        component={SymptomTrackerScreen}
      />

      <Stack.Screen
        name="MyMedicines"
        component={MyMedicinesScreen}
      />
      <Stack.Screen
        name="MedicinesList"
        component={MedicinesListScreen}
      />
      <Stack.Screen
        name="MedicineDetail"
        component={MedicineDetailScreen}
      />

      <Stack.Screen
        name="ConditionList"
        component={ConditionListScreen}
      />
      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetailScreen}
      />

      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
    </Stack.Navigator>
  )
}
