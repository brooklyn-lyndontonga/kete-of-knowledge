/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../../features/profile/screens/ProfileScreen"
import ProfileGuidelinesScreen from "../../features/profile/screens/ProfileGuidelinesScreen"

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
