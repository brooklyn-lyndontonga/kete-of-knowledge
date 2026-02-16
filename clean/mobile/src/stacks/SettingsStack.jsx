 
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { colors, spacing, typography, radii } from "../theme"
import { useAuth } from "../auth/AuthContext"

const Stack = createNativeStackNavigator();

function SettingsScreen() {
  const { isAuthenticated, isGuest, login, logout, openAuth, authReady } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Tautuhinga</Text>
      <Pressable
        onPress={isAuthenticated ? logout : login}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        disabled={!authReady && !isAuthenticated}
      >
        <Text style={styles.buttonText}>
          {isAuthenticated ? "Sign out" : isGuest ? "Sign in" : "Sign in"}
        </Text>
      </Pressable>

      {isGuest ? (
        <Pressable
          onPress={openAuth}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.secondaryText}>Open sign-in screen</Text>
        </Pressable>
      ) : null}
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
  button: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.olive,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  secondaryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.meringue,
  },
  secondaryText: {
    ...typography.bodyStrong,
    color: colors.olive,
  },
})
