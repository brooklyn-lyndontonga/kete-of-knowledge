/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Modal,
  Alert,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useTheme } from '../../theme'
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../../lib/api' // <-- CRUD API

export default function ContactsScreen() {
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal state
  const [modalVisible, setModalVisible] = useState(false)
  const [editId, setEditId] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [relationship, setRelationship] = useState('')

  // --------------------------------------------------
  // SUPPORT SERVICES (STATIC)
  // --------------------------------------------------
  const services = [
    {
      id: 1,
      name: 'Healthline',
      desc: '24/7 free medical advice',
      phone: '0800611116',
      emoji: '🩺',
    },
    {
      id: 2,
      name: 'Emergency Services',
      desc: 'Life-threatening emergencies',
      phone: '111',
      emoji: '🚑',
    },
    {
      id: 3,
      name: '1737 – Need to Talk?',
      desc: 'Free mental health support',
      phone: '1737',
      emoji: '💬',
    },
    {
      id: 4,
      name: 'Quitline',
      desc: 'Stop smoking assistance',
      phone: '0800778778',
      emoji: '🚭',
    },
  ]

  // --------------------------------------------------
  // LOAD CONTACTS
  // --------------------------------------------------
  async function loadContacts() {
    try {
      const data = await getContacts()
      setContacts(data)
    } catch (err) {
      console.log('❌ Error loading contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  // --------------------------------------------------
  // CALL HANDLER
  // --------------------------------------------------
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  // --------------------------------------------------
  // SAVE CONTACT (ADD OR EDIT)
  // --------------------------------------------------
  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing details', 'Name and phone are required.')
      return
    }

    try {
      if (editId) {
        // UPDATE
        await updateContact(editId, { name, phone, relationship })
      } else {
        // CREATE
        await addContact({ name, phone, relationship })
      }

      setModalVisible(false)
      setEditId(null)
      setName('')
      setPhone('')
      setRelationship('')
      loadContacts()
    } catch (err) {
      console.log('❌ Save error:', err)
    }
  }

  // --------------------------------------------------
  // DELETE CONTACT
  // --------------------------------------------------
  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to remove this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteContact(id)
              loadContacts()
            } catch (err) {
              console.log('❌ Delete error:', err)
            }
          },
        },
      ]
    )
  }

  // --------------------------------------------------
  // OPEN EDIT MODAL
  // --------------------------------------------------
  const openEdit = (contact) => {
    setEditId(contact.id)
    setName(contact.name)
    setPhone(contact.phone)
    setRelationship(contact.relationship)
    setModalVisible(true)
  }

  // --------------------------------------------------
  // OPEN ADD MODAL
  // --------------------------------------------------
  const openAdd = () => {
    setEditId(null)
    setName('')
    setPhone('')
    setRelationship('')
    setModalVisible(true)
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Contacts & Support</Text>
        <Text style={styles.subheading}>
          He waka eke noa — you are not alone.
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

      {contacts.map((contact, idx) => (
        <Animated.View
          key={contact.id}
          entering={FadeInUp.delay(200 + idx * 80).duration(500)}
          style={[styles.card, { backgroundColor: colors.accent1 }]}
        >
          <Text style={styles.cardTitle}>
            {contact.emoji || '👤'} {contact.name}
          </Text>

          <TouchableOpacity
            onPress={() => handleCall(contact.phone)}
            style={styles.callButtonLight}
          >
            <Text style={styles.callTextLight}>Call {contact.phone}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => openEdit(contact)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(contact.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}

      {/* Add Contact Button */}
      <TouchableOpacity style={styles.addButton} onPress={openAdd}>
        <Text style={styles.addButtonText}>+ Add Contact</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />

      {/* ============================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ============================================= */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editId ? 'Edit Contact' : 'New Contact'}
            </Text>

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            <TextInput
              placeholder="Relationship (optional)"
              value={relationship}
              onChangeText={setRelationship}
              style={styles.input}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      backgroundColor: '#ffffff',
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
      alignItems: 'center',
      marginTop: 6,
    },
    callText: {
      color: '#fff',
      fontFamily: typography.medium,
    },
    callButtonLight: {
      backgroundColor: 'rgba(255,255,255,0.25)',
      padding: 10,
      borderRadius: radii.md,
      alignItems: 'center',
      marginTop: 6,
    },
    callTextLight: {
      color: '#fff',
      fontFamily: typography.medium,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    editText: {
      color: '#0047AB',
      fontWeight: '600',
    },
    deleteText: {
      color: '#B00020',
      fontWeight: '600',
    },
    addButton: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    addButtonText: {
      color: '#fff',
      fontFamily: typography.medium,
      fontSize: 16,
    },

    // MODAL
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      width: '85%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    saveText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    cancelButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    cancelText: {
      color: colors.textLight,
      fontWeight: '600',
    },
  })
}
