/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../../screens/library/LibraryScreen"
import LibraryGuideScreen from "../../screens/library/LibraryGuideScreen"

function LibraryStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{ title: "Library" }}
      />
      <Stack.Screen
        name="LibraryGuide"
        component={LibraryGuideScreen}
        options={{ title: "Guide" }}
      />
    </Stack.Navigator>
  )
}

export default LibraryStack
