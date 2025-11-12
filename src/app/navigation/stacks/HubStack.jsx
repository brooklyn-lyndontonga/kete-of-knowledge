import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HubScreen from "../../../screens/hub/HubScreen";
import ConditionsScreen from "../../../screens/hub/ConditionsScreen";
import ConditionDetailScreen from "../../../screens/hub/ConditionDetailScreen";
import SymptomsScreen from "../../../screens/hub/SymptomsScreen";
import SymptomTrackerScreen from "../../../screens/hub/SymptomTrackerScreen";
import MedicinesScreen from "../../../screens/hub/MedicinesScreen";
import MedicineDetailScreen from "../../../screens/hub/MedicineDetailScreen";
import ResourcesScreen from "../../../screens/hub/ResourcesScreen";
import ContactsScreen from "../../../screens/hub/ContactsScreen";

const Stack = createNativeStackNavigator();

export default function HubStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HubScreen" component={HubScreen} />
      <Stack.Screen name="ConditionsScreen" component={ConditionsScreen} />
      <Stack.Screen
        name="ConditionDetailScreen"
        component={ConditionDetailScreen}
      />
      <Stack.Screen name="SymptomsScreen" component={SymptomsScreen} />
      <Stack.Screen
        name="SymptomTrackerScreen"
        component={SymptomTrackerScreen}
      />
      <Stack.Screen name="MedicinesScreen" component={MedicinesScreen} />
      <Stack.Screen
        name="MedicineDetailScreen"
        component={MedicineDetailScreen}
      />
      <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
      <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
    </Stack.Navigator>
  );
}
