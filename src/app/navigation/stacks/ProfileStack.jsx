import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileHomeScreen from "../../../features/profile/ProfileHomeScreen"
import GoalsScreen from "../../../features/profile/GoalsScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
    </Stack.Navigator>
  )
}
