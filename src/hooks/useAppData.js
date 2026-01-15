import { useState } from "react"

export function useAppData() {
  const [symptoms, setSymptoms] = useState([])
  const [profile, setProfile] = useState(null)

  function addSymptom(symptom) {
    setSymptoms((prev) => [...prev, symptom])
  }

  function updateProfile(data) {
    setProfile(data)
  }

  return {
    symptoms,
    addSymptom,
    profile,
    updateProfile,
  }
}
