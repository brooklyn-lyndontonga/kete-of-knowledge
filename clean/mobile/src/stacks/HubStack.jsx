 
 
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors, typography } from "../theme"

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
import ContactsScreen from "../screens/hub/ContactsScreen"
import AddContactScreen from "../screens/hub/AddContactScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cornsilk },
        headerTintColor: colors.olive,
        headerTitleStyle: {
          fontFamily: typography.title.fontFamily,
          fontSize: typography.title.fontSize,
          color: colors.text,
        },
      }}
    >
      <Stack.Screen
        name="HubMain"
        component={HubScreen}
        options={{ title: "My Hub / Tāku Manawa" }}
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

      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
    </Stack.Navigator>
  )
}
