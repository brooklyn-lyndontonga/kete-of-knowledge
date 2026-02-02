/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../theme"

const Stack = createNativeStackNavigator();

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Tautuhinga</Text>
    </View>
  )
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
})
