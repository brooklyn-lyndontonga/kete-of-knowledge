/* eslint-disable react/prop-types */
 
/* eslint-disable react/react-in-jsx-scope */

import { ScrollView, StyleSheet, Text, View } from "react-native"
import HubSection from "../../components/hub/HubSection"
import { colors, layout, spacing, typography } from "../../theme"

export default function HubScreen({ navigation }) {
  const sections = [
    { label: "My Symptoms", subtitle: "Āku Tohu", route: "MySymptoms" },
    { label: "My Medicines", subtitle: "Āku Rongoā", route: "MyMedicines" },
    { label: "Reminders", subtitle: "Whakamahara", route: "Reminders" },
    { label: "Checklists", subtitle: "Rārangi Arowhai", route: "Checklists" },
    { label: "Notes", subtitle: "Tuhipoka", route: "Notes" },
  ]

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Hub</Text>
        <Text style={styles.subtitle}>Taku Manawa</Text>
      </View>

      {sections.map((item) => (
        <HubSection
          key={item.route}
          title={item.label}
          subtitle={item.subtitle}
          onPress={() => navigation.navigate(item.route)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: layout.screenPadding,
    paddingBottom: 40,
  },
  header: {
    marginBottom: spacing.md,
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
