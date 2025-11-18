import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LibraryHomeScreen from "../../../features/library/screens/LibraryHomeScreen"
import ConditionDetailScreen from "../../../features/library/screens/ConditionDetailScreen"
import ConditionListScreen from "../../../features/library/screens/ConditionListScreen"
import LibraryGuideScreen from "../../../features/library/screens/LibraryGuideScreen"
import ResourceCategoryScreen from "../../../features/library/screens/ResourceCategoryScreen"
import ResourceDetailScreen from "../../../features/library/screens/ResourceDetailScreen"
import WhakataukiScreen from "../../../features/library/screens/WhakataukiScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryHome" component={LibraryHomeScreen} />
      <Stack.Screen name="ConditionList" component={ConditionListScreen} />
      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetailScreen}
      />
      <Stack.Screen name="LibraryGuide" component={LibraryGuideScreen} />
      <Stack.Screen
        name="ResourceCategory"
        component={ResourceCategoryScreen}
      />
      <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
      <Stack.Screen name="Whakatauki" component={WhakataukiScreen} />
    </Stack.Navigator>
  )
}
