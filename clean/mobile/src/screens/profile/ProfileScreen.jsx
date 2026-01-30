/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfileGoals from "../../components/profile/ProfileGoals"
import ProfileNotes from "../../components/profile/ProfileNotes"

import { getGoals, toggleGoal } from "../../features/goals.db.js"

export default function ProfileScreen({ navigation }) {
  const [goals, setGoals] = useState([])
  const isFocused = useIsFocused()

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

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
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
