/* eslint-disable react/react-in-jsx-scope */

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors, typography } from "../theme"

import HomeScreen from '../screens/home/HomeScreen'
import SymptomsHubScreen from '../screens/home/SymptomsHubScreen'
import MedicinesHubScreen from '../screens/MedicinesHubScreen'
import AddSymptomScreen from '../screens/hub/AddSymptomScreen'
import AddMedicineScreen from '../screens/hub/AddMedicineScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
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
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Home / Kainga' }}
      />

      <Stack.Screen
        name="SymptomsHub"
        component={SymptomsHubScreen}
        options={{ title: 'Symptoms' }}
      />

      <Stack.Screen
        name="MedicinesHub"
        component={MedicinesHubScreen}
        options={{ title: 'Rongoā & Medicines' }}
      />

      <Stack.Screen
        name="AddSymptom"
        component={AddSymptomScreen}
        options={{ title: 'Add Symptom' }}
      />

      <Stack.Screen
        name="AddMedicine"
        component={AddMedicineScreen}
        options={{ title: 'Add Medicine' }}
      />
    </Stack.Navigator>
  )
}
