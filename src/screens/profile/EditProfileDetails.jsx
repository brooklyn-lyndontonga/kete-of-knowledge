/* eslint-disable react/prop-types */
import React from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  Pressable,
} from "react-native"
import { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "../../lib/api"

export default function EditProfileDetails({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    sexAtBirth: "",
    gender: "",
    primaryCareProvider: "",
    conditionsSummary: "",
    allergiesSummary: "",
    careNotes: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    secondaryContactName: "",
    secondaryContactPhone: "",
  })

  const [image, setImage] = useState(null)
  const PROFILE_ID = 1 // MVP assumption (single profile)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const res = await fetch(`${API_URL}/profile`)
      const data = await res.json()

      setForm((prev) => ({ ...prev, ...data }))
      setImage(data.profileImageUrl || null)
    } catch (err) {
      console.warn("Failed to load profile", err)
    }
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      alert("Permission to access photos is required")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  async function uploadImageIfNeeded() {
    if (!image || !image.startsWith("file://")) {
      return image // already uploaded or unchanged
    }

    const formData = new FormData()
    formData.append("image", {
      uri: image,
      name: "profile.jpg",
      type: "image/jpeg",
    })

    const res = await fetch(`${API_URL}/upload/profile-image`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    const data = await res.json()
    return `${API_URL}${data.imageUrl}`
  }

  async function save() {
    try {
      const imageUrl = await uploadImageIfNeeded()

      await fetch(`${API_URL}/profile/${PROFILE_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          profileImageUrl: imageUrl,
        }),
      })

      navigation.goBack()
    } catch (err) {
      console.warn("Failed to save profile", err)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Personal & health details
      </Text>

      {/* Profile Image */}
      <Pressable
        onPress={pickImage}
        style={{ alignItems: "center", marginBottom: 24 }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#DDD",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Add photo</Text>
          </View>
        )}
        <Text style={{ color: "#007AFF", marginTop: 8 }}>
          Change profile photo
        </Text>
      </Pressable>

      {/* Identity */}
      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(v) => update("name", v)}
      />

      <TextInput
        placeholder="Date of birth (DD/MM/YYYY)"
        value={form.dateOfBirth}
        onChangeText={(v) => update("dateOfBirth", v)}
      />

      <TextInput
        placeholder="Sex at birth"
        value={form.sexAtBirth}
        onChangeText={(v) => update("sexAtBirth", v)}
      />

      <TextInput
        placeholder="Gender"
        value={form.gender}
        onChangeText={(v) => update("gender", v)}
      />

      {/* Health context */}
      <TextInput
        placeholder="Primary care provider (optional)"
        value={form.primaryCareProvider}
        onChangeText={(v) =>
          update("primaryCareProvider", v)
        }
      />

      <TextInput
        placeholder="Health conditions (summary)"
        value={form.conditionsSummary}
        onChangeText={(v) =>
          update("conditionsSummary", v)
        }
        multiline
      />

      <TextInput
        placeholder="Allergies (summary)"
        value={form.allergiesSummary}
        onChangeText={(v) =>
          update("allergiesSummary", v)
        }
        multiline
      />

      <TextInput
        placeholder="Care notes (optional)"
        value={form.careNotes}
        onChangeText={(v) => update("careNotes", v)}
        multiline
      />

      {/* Support contacts */}
      <Text style={{ fontSize: 16, marginTop: 24 }}>
        Support contacts
      </Text>

      <TextInput
        placeholder="Emergency contact name"
        value={form.emergencyContactName}
        onChangeText={(v) =>
          update("emergencyContactName", v)
        }
      />

      <TextInput
        placeholder="Relationship (optional)"
        value={form.emergencyContactRelationship}
        onChangeText={(v) =>
          update("emergencyContactRelationship", v)
        }
      />

      <TextInput
        placeholder="Emergency contact phone"
        value={form.emergencyContactPhone}
        onChangeText={(v) =>
          update("emergencyContactPhone", v)
        }
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Secondary support contact name (optional)"
        value={form.secondaryContactName}
        onChangeText={(v) =>
          update("secondaryContactName", v)
        }
      />

      <TextInput
        placeholder="Secondary support phone (optional)"
        value={form.secondaryContactPhone}
        onChangeText={(v) =>
          update("secondaryContactPhone", v)
        }
        keyboardType="phone-pad"
      />

      {/* Actions */}
      <Button title="Save details" onPress={save} />
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  )
}
