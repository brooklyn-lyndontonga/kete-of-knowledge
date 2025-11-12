import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LibraryScreen from "../../../screens/library/LibraryScreen";
import ResourcesScreen from "../../../screens/library/ResourcesScreen";
import RongoaScreen from "../../../screens/library/RongoaScreen";
import ExportDataScreen from "../../../screens/library/ExportDataScreen";
import LibraryPlaceholderScreen from "../../../screens/library/LibraryPlaceholderScreen";

const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
      <Stack.Screen name="RongoaScreen" component={RongoaScreen} />
      <Stack.Screen name="ExportDataScreen" component={ExportDataScreen} />
      <Stack.Screen
        name="LibraryPlaceholderScreen"
        component={LibraryPlaceholderScreen}
      />
    </Stack.Navigator>
  );
}
