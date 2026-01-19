/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

import ProfileIdentity from "./components/ProfileIdentity"
import ProfileGoalsPreview from "./components/ProfileGoalsPreview"
import ProfileFocusPreview from "./components/ProfileFocusPreview"
import ProfileMeta from "./components/ProfileMeta"

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const res = await fetch(`${API_URL}/profile`)
    const data = await res.json()
    setProfile(data)
  }

  if (!profile) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading profile…</Text>
      </View>
    )
  }

  return (
    <View style={{ padding: 16 }}>
      <ProfileIdentity
        profile={profile}
        onEdit={() => navigation.navigate("EditProfileDetails")}
      />

      <ProfileGoalsPreview
        goals={profile.goals}
        onEdit={() => navigation.navigate("EditProfileGoals")}
      />

      <ProfileFocusPreview
        focus={profile.goals}
        onEdit={() => navigation.navigate("EditProfileFocus")}
      />

      <ProfileMeta />
    </View>
  )
}
