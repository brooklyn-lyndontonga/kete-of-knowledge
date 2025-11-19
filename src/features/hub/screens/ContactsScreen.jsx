import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import api from "../../../lib/api"

export default function ContactsScreen() {
  const { colors, spacing, radii, typography } = useTheme()

  // -------------------------
  // STATIC SUPPORT SERVICES
  // -------------------------
  const services = [
    {
      id: "s1",
      name: "Healthline",
      desc: "24/7 free medical advice",
      phone: "0800611116",
      emoji: "🩺",
    },
    {
      id: "s2",
      name: "Emergency Services",
      desc: "Call in life-threatening situations",
      phone: "111",
      emoji: "🚑",
    },
    {
      id: "s3",
      name: "1737 – Need to Talk?",
      desc: "Free mental health support",
      phone: "1737",
      emoji: "💬",
    },
    {
      id: "s4",
      name: "Quitline",
      desc: "Support to stop smoking",
      phone: "0800778778",
      emoji: "🚭",
    },
  ]

  // -------------------------
  // USER CONTACTS (CRUD)
  // -------------------------
  const [contacts, setContacts] = useState([])

  const [form, setForm] = useState({
    name: "",
    phone: "",
    notes: "",
  })

  function handleCall(phone) {
    Linking.openURL(`tel:${phone}`)
  }

  // LOAD CONTACTS
  async function loadContacts() {
    try {
      const data = await api.get("/contacts")
      if (Array.isArray(data)) {
        setContacts(data)
      } else {
        console.log("⚠️ Backend did not return array:", data)
        setContacts([])
      }
    } catch (error) {
      console.log("Error loading contacts:", error)
    }
  }

  // ADD CONTACT
  async function addContact() {
    if (!form.name || !form.phone) return

    try {
      await api.post("/contacts", form)
      setForm({ name: "", phone: "", notes: "" })
      loadContacts()
    } catch (error) {
      console.log("Error adding contact:", error)
    }
  }

  // DELETE CONTACT  (IMPORTANT: api.del not api.delete)
  async function deleteContact(id) {
    try {
      await api.del(`/contacts/${id}`)
      loadContacts()
    } catch (error) {
      console.log("Error deleting contact:", error)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Contacts & Support</Text>
        <Text style={styles.subheading}>
          He waka eke noa — you are not alone on this journey.
        </Text>
      </Animated.View>

      {/* Support Services */}
      <Text style={styles.sectionTitle}>Support Services</Text>
      {services.map((service, idx) => (
        <Animated.View
          key={service.id}
          entering={FadeInUp.delay(200 + idx * 120).duration(500)}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            {service.emoji} {service.name}
          </Text>
          <Text style={styles.cardDesc}>{service.desc}</Text>

          <TouchableOpacity
            onPress={() => handleCall(service.phone)}
            style={styles.callButton}
          >
            <Text style={styles.callText}>Call {service.phone}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Whānau Contacts */}
      <Text style={styles.sectionTitle}>Whānau Support</Text>

      {contacts.length === 0 && (
        <Text style={{ opacity: 0.6, marginBottom: spacing.md }}>
          No contacts added yet.
        </Text>
      )}

      {contacts.map((contact, idx) => (
        <Animated.View
          key={contact.id}
          entering={FadeInUp.delay(200 + idx * 80).duration(500)}
          style={[styles.card, { backgroundColor: colors.accent1 }]}
        >
          <Text style={styles.cardTitle}>💚 {contact.name}</Text>

          <TouchableOpacity
            onPress={() => handleCall(contact.phone)}
            style={styles.callButtonLight}
          >
            <Text style={styles.callTextLight}>Call {contact.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteContact(contact.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Add Contact Form */}
      <Text style={styles.sectionTitle}>Add New Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(t) => setForm({ ...form, phone: t })}
      />

      <TextInput
        style={styles.input}
        placeholder="Notes (optional)"
        value={form.notes}
        onChangeText={(t) => setForm({ ...form, notes: t })}
      />

      <TouchableOpacity onPress={addContact} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>

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
      fontSize: 14,
      color: colors.textLight,
      marginTop: 4,
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
      marginTop: spacing.md,
    },
    card: {
      backgroundColor: "#ffffff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 4,
      color: colors.text,
    },
    cardDesc: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.8,
      marginBottom: spacing.sm,
    },
    callButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: radii.md,
      alignItems: "center",
      marginTop: 6,
    },
    callText: {
      color: "#fff",
      fontFamily: typography.medium,
    },
    callButtonLight: {
      backgroundColor: "rgba(255,255,255,0.25)",
      padding: 10,
      borderRadius: radii.md,
      alignItems: "center",
      marginTop: 6,
    },
    callTextLight: {
      color: "#fff",
      fontFamily: typography.medium,
    },
    deleteButton: {
      backgroundColor: "#b3261e",
      padding: 10,
      borderRadius: radii.md,
      alignItems: "center",
      marginTop: 10,
    },
    deleteText: {
      color: "#fff",
      fontFamily: typography.medium,
    },
    addButton: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.lg,
    },
    addButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
    input: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
  })
}
