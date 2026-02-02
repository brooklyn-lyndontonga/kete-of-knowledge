/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../screens/profile/ProfileScreen"
import AddGoalScreen from "../screens/profile/AddGoalScreen"
import EditProfileScreen from "../screens/profile/EditProfileScreen"
import { colors, typography } from "../theme"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cornsilk },
        headerTintColor: colors.olive,
        headerTitleStyle: {
          fontFamily: typography.title.fontFamily,
          fontSize: typography.title.fontSize,
          color: colors.text,
        },
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: "Profile / Kōtaha" }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />

      <Stack.Screen
        name="AddGoal"
        component={AddGoalScreen}
        options={{ title: "Add Goal" }}
      />
    </Stack.Navigator>
  )
}
