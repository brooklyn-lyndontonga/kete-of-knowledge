/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfilesScreen from "../../screens/ProfilesScreen"
import ProfileGuidelinesScreen from "../../screens/ProfileGuidelinesScreen"

const Stack = createNativeStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesHome"
        component={ProfilesScreen}
        options={{ title: "Profiles" }}
      />
      <Stack.Screen
        name="ProfileGuidelines"
        component={ProfileGuidelinesScreen}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
