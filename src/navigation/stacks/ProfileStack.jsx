import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../theme"
import ProfileScreen from "../../features/profile/screens/ProfileScreen"

const Stack = createNativeStackNavigator() // must be top level

export default function ProfileStack() {
  const { colors, typography } = useTheme() // ✅ inside component

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontFamily: typography.display },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Your Profile",
          headerRight: () => (
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={colors.primary}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
