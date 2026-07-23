import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../screens/LibraryScreen"
import ConditionsScreen from "../screens/library/ConditionsScreen"
import ConditionDetailScreen from "../screens/library/ConditionDetailScreen"
import { colors, typography } from "../theme"

const Stack = createNativeStackNavigator()

export default function LibraryStack() {
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
        name="LibraryMain"
        component={LibraryScreen}
        options={{ title: "Library / Puna" }}
      />
      <Stack.Screen
        name="Conditions"
        component={ConditionsScreen}
        options={{ title: "Conditions / Ngā mate" }}
      />
      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetailScreen}
        options={({ route }) => ({ title: route.params?.title || "Condition" })}
      />
    </Stack.Navigator>
  )
}
