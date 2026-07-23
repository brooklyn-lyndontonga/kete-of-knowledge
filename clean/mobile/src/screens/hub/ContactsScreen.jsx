import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import {
  CONTACT_CATEGORIES,
  deleteContact,
  getContactsByCategory,
} from "../../features/contacts.db"
import { colors, layout, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"

export async function dial(phone) {
  if (!phone) return
  const url = `tel:${String(phone).replace(/\s+/g, "")}`
  const supported = await Linking.canOpenURL(url)
  if (supported) {
    Linking.openURL(url)
  } else {
    Alert.alert("Can't make calls", "This device can't start a phone call.")
  }
}

export default function ContactsScreen({ navigation }) {
  const [grouped, setGrouped] = useState({})
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  const load = useCallback(() => {
    getContactsByCategory()
      .then(setGrouped)
      .catch((err) => console.warn("Could not load contacts:", err?.message))
  }, [])

  useFocusEffect(
    useCallback(() => {
      load()
    }, [load])
  )

  function confirmDelete(contact) {
    Alert.alert("Remove contact", `Remove ${contact.name} from your contacts?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => deleteContact(contact.id).then(load),
      },
    ])
  }

  const emergency = (grouped.emergency || []).concat(
    Object.values(grouped)
      .flat()
      .filter((c) => c.is_emergency && c.category !== "emergency")
  )

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>Ngā whakapā</Text>
      </View>

      <Pressable
        onPress={() => dial("111")}
        style={({ pressed }) => [styles.emergencyBar, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Call 111 emergency services"
      >
        <Text style={styles.emergencyText}>Call 111</Text>
        <Text style={styles.emergencySub}>Emergency services</Text>
      </Pressable>

      {emergency.length > 0 ? (
        <View style={styles.quickRow}>
          {emergency.slice(0, 3).map((contact) => (
            <Pressable
              key={`quick-${contact.id}`}
              onPress={() => dial(contact.phone)}
              style={({ pressed }) => [styles.quickChip, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={`Call ${contact.name}`}
            >
              <Text style={styles.quickChipText} numberOfLines={1}>
                {contact.name}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Pressable
        onPress={() => guard(() => navigation.navigate("AddContact"))}
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.pressed,
        ]}
      >
        <Text style={styles.primaryText}>Add Contact</Text>
      </Pressable>

      {CONTACT_CATEGORIES.map(({ key, label, reo }) => {
        const items = grouped[key] || []
        return (
          <View key={key} style={styles.section}>
            <Text style={styles.sectionTitle}>{label}</Text>
            <Text style={styles.sectionReo}>{reo}</Text>

            {items.length === 0 ? (
              <Text style={styles.empty}>None added yet</Text>
            ) : (
              items.map((contact) => (
                <View key={contact.id} style={styles.card}>
                  <View style={styles.cardMain}>
                    <Text style={styles.cardTitle}>{contact.name}</Text>
                    {contact.relationship ? (
                      <Text style={styles.cardMeta}>{contact.relationship}</Text>
                    ) : null}
                    {contact.phone ? (
                      <Text style={styles.cardMeta}>{contact.phone}</Text>
                    ) : null}
                  </View>

                  <View style={styles.cardActions}>
                    {contact.phone ? (
                      <Pressable
                        onPress={() => dial(contact.phone)}
                        style={({ pressed }) => [
                          styles.callButton,
                          pressed && styles.pressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={`Call ${contact.name}`}
                      >
                        <Text style={styles.callText}>Call</Text>
                      </Pressable>
                    ) : null}
                    <Pressable
                      onPress={() => guard(() => confirmDelete(contact))}
                      style={({ pressed }) => [
                        styles.removeButton,
                        pressed && styles.pressed,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${contact.name}`}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: {
    padding: layout.screenPadding,
    gap: spacing.md,
    paddingBottom: 40,
  },
  header: { gap: spacing.xs },
  title: { ...typography.display, color: colors.olive },
  subtitle: { ...typography.caption, color: colors.muted },
  pressed: { opacity: 0.85 },
  emergencyBar: {
    backgroundColor: colors.orange,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: "center",
    ...shadow.card,
  },
  emergencyText: { ...typography.display, color: colors.white, fontSize: 24 },
  emergencySub: { ...typography.caption, color: colors.white, opacity: 0.9 },
  quickRow: { flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" },
  quickChip: {
    backgroundColor: colors.meringue,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    maxWidth: "48%",
  },
  quickChipText: { ...typography.bodyStrong, color: colors.olive },
  primaryButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
  section: { gap: spacing.xs, marginTop: spacing.sm },
  sectionTitle: { ...typography.title, color: colors.text },
  sectionReo: { ...typography.caption, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.xs,
    gap: spacing.sm,
    ...shadow.card,
  },
  cardMain: { gap: 2 },
  cardTitle: { ...typography.bodyStrong, color: colors.text },
  cardMeta: { ...typography.caption, color: colors.muted },
  cardActions: { flexDirection: "row", gap: spacing.sm },
  callButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  callText: { ...typography.bodyStrong, color: colors.cornsilk },
  removeButton: {
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  removeText: { ...typography.bodyStrong, color: colors.russet },
  empty: { ...typography.caption, color: colors.muted, marginTop: spacing.xs },
})
