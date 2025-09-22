/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfilesScreen from "../../screens/ProfilesScreen"

const Stack = createNativeStackNavigator()

function ProfilesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilesHome" component={ProfilesScreen} options={{ title: "Profiles" }} />
    </Stack.Navigator>
  )
}

export default ProfilesStack