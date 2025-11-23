 
import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function DataSettingsScreen() {
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  function handleExport() {
    Alert.alert(
      "Data Export",
      "A downloadable copy of your data will be generated in the full version of the app.",
    )
  }

  function handleDelete() {
    Alert.alert(
      "Delete My Data",
      "Are you sure you want to delete ALL personal data? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Deleted", "Your data has been removed (demo).")
          },
        },
      ]
    )
  }

  function openLink(url) {
    Linking.openURL(url)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(500)}>
        <Text style={styles.heading}>Data Settings</Text>
        <Text style={styles.subheading}>
          Manage your data, privacy, and app information.
        </Text>
      </Animated.View>

      {/* Data Actions */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.item}>
        <TouchableOpacity onPress={handleExport}>
          <Text style={styles.itemText}>📤 Export My Data</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300)} style={styles.item}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={[styles.itemText, { color: colors.danger }]}>
            🗑 Delete My Data
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Information Links */}
      <Text style={styles.sectionTitle}>Information</Text>

      <Animated.View entering={FadeInUp.delay(450)} style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            openLink("https://funny-looking-face-paints.netlify.app/terms")
          }
        >
          <Text style={styles.itemText}>📄 Terms & Conditions</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)} style={styles.item}>
        <TouchableOpacity onPress={() => openLink("https://example.com/privacy")}>
          <Text style={styles.itemText}>🔐 Privacy Policy</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(750)} style={styles.item}>
        <TouchableOpacity onPress={() => openLink("https://example.com/about")}>
          <Text style={styles.itemText}>ℹ️ About This App</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
    },

    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.8,
      marginBottom: spacing.xl,
    },

    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
      color: colors.text,
    },

    item: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },

    itemText: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: colors.text,
    },
  })
}
