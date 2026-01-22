import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SettingsScreen from "../../../screens/settings/SettingsScreen"
import DataManagementScreen from "../../../screens/settings/DataManagementScreen"
import NotificationSettingsScreen from "../../../screens/settings/NotificationSettingsScreen"

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationSettingsScreen} />
      <Stack.Screen name="DataManagement" component={DataManagementScreen} />
    </Stack.Navigator>
  )
}
