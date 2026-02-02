/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "../screens/LibraryScreen"
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
    </Stack.Navigator>
  )
}
