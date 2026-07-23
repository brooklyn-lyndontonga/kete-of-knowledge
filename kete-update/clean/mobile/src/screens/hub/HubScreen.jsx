import { ScrollView, StyleSheet, Text, View } from "react-native"
import HubSection from "../../components/hub/HubSection"
import { colors, layout, spacing, typography } from "../../theme"
import { useLanguage } from "../../i18n/LanguageContext"

export default function HubScreen({ navigation }) {
  const { t } = useLanguage()

  const sections = [
    { label: t("hub.symptoms"), route: "MySymptoms" },
    { label: t("hub.medicines"), route: "MyMedicines" },
    { label: t("hub.reminders"), route: "Reminders" },
    { label: t("hub.checklists"), route: "Checklists" },
    { label: t("hub.notes"), route: "Notes" },
    { label: t("hub.contacts"), route: "Contacts" },
  ]

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {t("hub.title")}
        </Text>
      </View>

      {sections.map((item) => (
        <HubSection
          key={item.route}
          title={item.label}
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
