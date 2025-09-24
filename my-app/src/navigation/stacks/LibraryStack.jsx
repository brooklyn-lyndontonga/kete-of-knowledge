/* eslint-disable unused-imports/no-unused-vars */

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../../screens/LibraryScreen"
import LibraryGuideScreen from "../../screens/LibraryGuideScreen"

const Stack = createNativeStackNavigator()

function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LibraryHome" component={LibraryScreen} options={{ title: "Library" }} />
      <Stack.Screen name="LibraryGuide" component={LibraryGuideScreen} />
    </Stack.Navigator>
  )
}

export default LibraryStack
