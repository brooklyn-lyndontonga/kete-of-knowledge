/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
// import React from "react"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// import HomeStack from "../stacks/HomeStack"
// import HubStack from "../stacks/HubStack"
// import LibraryStack from "../stacks/LibraryStack"
// import ProfileStack from "../stacks/ProfileStack"
// import SettingsStack from "../stacks/SettingsStack"

// const Tab = createBottomTabNavigator()

// export default function AppTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Profile" component={ProfileStack} />
//       <Tab.Screen name="Hub" component={HubStack} />
//       <Tab.Screen name="Library" component={LibraryStack} />
//       <Tab.Screen name="Settings" component={SettingsStack} />
//     </Tab.Navigator>
//   )
// }

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator()

function TestScreen({ label }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>{label}</Text>
    </View>
  )
}

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" children={() => <TestScreen label="HOME TAB" />} />
      <Tab.Screen name="Profile" children={() => <TestScreen label="PROFILE TAB" />} />
      <Tab.Screen name="Hub" children={() => <TestScreen label="HUB TAB" />} />
      <Tab.Screen name="Library" children={() => <TestScreen label="LIBRARY TAB" />} />
      <Tab.Screen name="Settings" children={() => <TestScreen label="SETTINGS TAB" />} />
    </Tab.Navigator>
  )
}
