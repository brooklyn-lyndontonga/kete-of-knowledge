/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../screens/LibraryScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryMain"
        component={LibraryScreen}
        options={{ title: "Library" }}
      />
    </Stack.Navigator>
  )
}
