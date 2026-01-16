import { useContext, useState } from "react"
import { AppDataContext } from "../context/AppDataContext"

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) {
    throw new Error("useAppData must be used inside AppDataContext.Provider")
  }
  return ctx
}

export function useAppDataProvider() {
  const [symptoms, setSymptoms] = useState([])

  // ✅ ADD THIS
  const [profile, setProfile] = useState({
    name: "",
  })

  function addSymptom(symptom) {
    setSymptoms((prev) => [...prev, symptom])
  }

  return {
    symptoms,
    addSymptom,

    // ✅ EXPOSE PROFILE
    profile,
    setProfile,
  }
}
