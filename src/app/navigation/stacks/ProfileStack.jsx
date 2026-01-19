/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../../screens/profile/ProfileScreen"
import EditProfileDetails from "../../../screens/profile/EditProfileDetails"
import EditProfileGoals from "../../../screens/profile/EditProfileGoals"
import EditProfileFocus from "../../../screens/profile/EditProfileFocus"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="EditProfileDetails" component={EditProfileDetails} />
      <Stack.Screen name="EditProfileGoals" component={EditProfileGoals} />
      <Stack.Screen name="EditProfileFocus" component={EditProfileFocus} />
    </Stack.Navigator>
  )
}
