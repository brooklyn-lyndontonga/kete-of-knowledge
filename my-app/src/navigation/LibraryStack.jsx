import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../screens/LibraryScreen"
import ConditionsScreen from "../screens/ConditionsScreen"
import SymptomsScreen from "../screens/SymptomsScreen"
import MedicinesScreen from "../screens/MedicinesScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{ title: "Library" }}
      />
      <Stack.Screen name="Conditions" component={ConditionsScreen} />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
      <Stack.Screen name="Medicines" component={MedicinesScreen} />
    </Stack.Navigator>
  )
}
