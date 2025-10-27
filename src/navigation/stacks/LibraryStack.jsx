import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ConditionListScreen from "../../features/library/screens/ConditionListScreen"
import ConditionDetailScreen from "../../features/library/screens/ConditionDetailScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConditionList" component={ConditionListScreen} />
      <Stack.Screen name="ConditionDetail" component={ConditionDetailScreen} />
    </Stack.Navigator>
  )
}
