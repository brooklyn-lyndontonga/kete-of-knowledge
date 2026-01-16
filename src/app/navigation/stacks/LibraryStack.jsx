import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LibraryScreen from "../../../screens/library/LibraryScreen"
import ConditionScreen from "../../../screens/library/ConditionScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{ title: "Library" }}
      />
      <Stack.Screen
        name="Condition"
        component={ConditionScreen}
        options={{ title: "Condition" }}
      />
    </Stack.Navigator>
  )
}
