 
 

import { ScrollView, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfileGoals from "../../components/profile/ProfileGoals"
import ProfileNotes from "../../components/profile/ProfileNotes"

import { getGoals, toggleGoal } from "../../features/goals.db.js"
import { colors, layout, spacing } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function ProfileScreen({ navigation }) {
  const [goals, setGoals] = useState([])
  const isFocused = useIsFocused()
  const { isGuest } = useAuth()

  async function load() {
    const data = await getGoals()
    setGoals(data || [])
  }

  async function handleToggle(goal) {
    await toggleGoal(goal.id, goal.active === 0)
    load()
  }

  useEffect(() => {
    if (isFocused) load()
  }, [isFocused])

  if (isGuest) {
    return (
      <GuestGate
        title="Create your profile"
        subtitle="Hangaia tō kōtaha"
        description="Sign in to save goals, notes, and health details."
      />
    )
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      {/* 👤 Personal details */}
      <ProfileHeader onEdit={() => navigation.navigate("EditProfile")} />

      {/* 🎯 Goals */}
      <ProfileGoals
        goals={goals}
        onToggle={handleToggle}
        onAdd={() => navigation.navigate("AddGoal")}
      />

      {/* 📝 Notes */}
      <ProfileNotes
        onOpen={() => navigation.navigate("ProfileNotes")}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: layout.screenPadding,
    gap: spacing.lg,
    paddingBottom: 40,
  },
})
