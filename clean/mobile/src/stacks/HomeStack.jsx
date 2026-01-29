/* eslint-disable react/react-in-jsx-scope */

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen"
import SymptomsHubScreen from "../screens/SymptomsHubScreen"
import MedicinesHubScreen from "../screens/MedicinesHubScreen"
import AddSymptomScreen from "../screens/AddSymptomScreen"
import AddMedicineScreen from "../screens/AddMedicineScreen"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Stack.Screen
        name="SymptomsHub"
        component={SymptomsHubScreen}
        options={{ title: "Symptoms" }}
      />

      <Stack.Screen
        name="MedicinesHub"
        component={MedicinesHubScreen}
        options={{ title: "Rongoā & Medicines" }}
      />

      <Stack.Screen
        name="AddSymptom"
        component={AddSymptomScreen}
        options={{ title: "Add Symptom" }}
      />

      <Stack.Screen
        name="AddMedicine"
        component={AddMedicineScreen}
        options={{ title: "Add Medicine" }}
      />
    </Stack.Navigator>
  )
}
