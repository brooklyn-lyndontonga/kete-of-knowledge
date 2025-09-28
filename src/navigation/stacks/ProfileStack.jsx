/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../../screens/profile/ProfileScreen"
import ProfileGuidelinesScreen from "../../screens/profile/ProfileGuidelinesScreen"

function ProfileStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesHome"
        component={ProfileScreen}
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
