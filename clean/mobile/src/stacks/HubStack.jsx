 
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HubScreen from "../screens/hub/HubScreen"
import MySymptomsScreen from "../screens/hub/MySymptomsScreen"
import MyMedicinesScreen from "../screens/hub/MyMedicinesScreen"
import AddSymptomScreen from "../screens/hub/AddSymptomScreen"
import AddMedicineScreen from "../screens/hub/AddMedicineScreen"
import RemindersScreen from "../screens/hub/RemindersScreen"
import AddReminderScreen from "../screens/hub/AddReminderScreen"
import ChecklistsScreen from "../screens/hub/ChecklistsScreen"
import AddChecklistScreen from "../screens/hub/AddChecklistScreen"
import NotesScreen from "../screens/hub/NotesScreen"
import AddNotesScreen from "../screens/hub/AddNotesScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HubMain"
        component={HubScreen}
        options={{ title: "My Hub" }}
      />

      <Stack.Screen name="MySymptoms" component={MySymptomsScreen} />
      <Stack.Screen name="AddSymptom" component={AddSymptomScreen} />

      <Stack.Screen name="MyMedicines" component={MyMedicinesScreen} />
      <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />

      <Stack.Screen name="Reminders" component={RemindersScreen} />
      <Stack.Screen name="AddReminder" component={AddReminderScreen} />

      <Stack.Screen name="Checklists" component={ChecklistsScreen} />
      <Stack.Screen name="AddChecklist" component={AddChecklistScreen} />

      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="AddNote" component={AddNotesScreen} />
    </Stack.Navigator>
  )
}
