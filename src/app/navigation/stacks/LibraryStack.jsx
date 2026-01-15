import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LibraryHomeScreen from "../../../features/library/LibraryHomeScreen"
import ResourceCategoryScreen from "../../../features/library/ResourceCategoryScreen"
import ResourceDetailScreen from "../../../features/library/ResourceDetailScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryHomeScreen}
      />
      <Stack.Screen
        name="ResourceCategory"
        component={ResourceCategoryScreen}
      />
      <Stack.Screen
        name="ResourceDetail"
        component={ResourceDetailScreen}
      />
    </Stack.Navigator>
  )
}
