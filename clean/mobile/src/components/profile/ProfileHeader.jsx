/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, Pressable } from "react-native"

export default function ProfileHeader({ name, imageUri, onUpload }) {
  return (
    <View style={{ alignItems: "center", gap: 8 }}>
      <Image
        source={imageUri ? { uri: imageUri } : null}
        style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#DDD" }}
      />
      <Pressable onPress={onUpload}>
        <Text style={{ color: "#007AFF" }}>Upload photo</Text>
      </Pressable>
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </View>
  )
}
