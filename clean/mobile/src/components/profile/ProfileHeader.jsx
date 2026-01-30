/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getProfile, saveProfile } from "../../features/profile.db.js";

export default function ProfileHeader({ onEdit }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      await saveProfile({
        ...profile,
        photo_uri: uri,
      });

      setProfile({ ...profile, photo_uri: uri });
    }
  }

  if (!profile) {
    return (
      <View style={{ padding: 16, backgroundColor: "#eee", borderRadius: 12 }}>
        <Text>No profile yet</Text>
        <Pressable onPress={onEdit}>
          <Text style={{ color: "#007AFF", marginTop: 8 }}>
            Create profile
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#eee",
        borderRadius: 12,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
      }}
    >
      {/* 🧑 Avatar */}
      <Pressable onPress={pickImage}>
        {profile.photo_uri ? (
          <Image
            source={{ uri: profile.photo_uri }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
            }}
          />
        ) : (
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: "#ccc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>+</Text>
          </View>
        )}
      </Pressable>

      {/* 👤 Info */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          {profile.name}
        </Text>

        {profile.dob && (
          <Text style={{ opacity: 0.7 }}>DOB: {profile.dob}</Text>
        )}

        <Pressable onPress={onEdit}>
          <Text style={{ color: "#007AFF", marginTop: 6 }}>
            Edit profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
