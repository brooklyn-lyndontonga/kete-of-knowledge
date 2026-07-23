import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsScreen from "../screens/SettingsScreen"
import { colors, typography } from "../theme"

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
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
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: "Settings / Tautuhinga" }}
      />
    </Stack.Navigator>
  )
}
