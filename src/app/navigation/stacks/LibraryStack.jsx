import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import {
  LibraryHomeScreen,
  LibraryGuideScreen,
  ConditionListScreen,
  ConditionDetailScreen,
  ResourceCategoryScreen,
  ResourceDetailScreen,
  RongoaScreen,
  WhakataukiScreen,
} from "../../../features/library"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryHomeScreen}
      />

      <Stack.Screen
        name="LibraryGuide"
        component={LibraryGuideScreen}
      />

      <Stack.Screen
        name="Conditions"
        component={ConditionListScreen}
      />

      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetailScreen}
      />

      <Stack.Screen
        name="ResourceCategory"
        component={ResourceCategoryScreen}
      />

      <Stack.Screen
        name="ResourceDetail"
        component={ResourceDetailScreen}
      />

      <Stack.Screen
        name="Rongoa"
        component={RongoaScreen}
      />

      <Stack.Screen
        name="Whakatauki"
        component={WhakataukiScreen}
      />
    </Stack.Navigator>
  )
}
