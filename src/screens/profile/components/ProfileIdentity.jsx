/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, Pressable, Image } from "react-native"

export default function ProfileIdentity({ profile, onEdit }) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
        marginBottom: 16,
        alignItems: "center",
      }}
    >
      {/* Profile Image */}
      {profile.profileImageUrl ? (
        <Image
          source={{ uri: profile.profileImageUrl }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            marginBottom: 12,
          }}
        />
      ) : (
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "#DDD",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 32 }}>
            {profile.name?.[0] || "?"}
          </Text>
        </View>
      )}

      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {profile.name}
      </Text>

      <Pressable onPress={onEdit}>
        <Text style={{ color: "#007AFF", marginTop: 8 }}>
          Edit personal details
        </Text>
      </Pressable>
    </View>
  )
}
