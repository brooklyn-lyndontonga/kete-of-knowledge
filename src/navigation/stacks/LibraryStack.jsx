import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../theme"
import { TouchableOpacity } from "react-native"
import ConditionListScreen from "../../features/library/screens/ConditionListScreen"
import ConditionDetailScreen from "../../features/library/screens/ConditionDetailScreen"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
  const { colors, typography } = useTheme()

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
        name="ConditionList"
        component={ConditionListScreen}
        options={{
          title: "Health Library",
          headerRight: () => (
            <Ionicons name="book-outline" size={24} color={colors.primary} />
          ),
        }}
      />

      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetailScreen}
        options={({ navigation, route }) => ({
          title: route.params?.condition?.name || "Condition Detail",
          // ✅ custom back button
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
