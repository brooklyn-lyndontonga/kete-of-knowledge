/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react"

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  // SYMPTOMS
  const [symptoms, setSymptoms] = useState([])

  const addSymptom = (symptom) => {
    setSymptoms((prev) => [symptom, ...prev])
  }

  const deleteSymptom = (id) => {
    setSymptoms((prev) => prev.filter((s) => s.id !== id))
  }

  // MEDICINES
  const [medicines, setMedicines] = useState([])

  const addMedicine = (med) => {
    setMedicines((prev) => [med, ...prev])
  }

  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id))
  }

  // CHECKLIST
  const [checklistItems, setChecklistItems] = useState([])

  const addChecklistItem = (item) => {
    setChecklistItems((prev) => [item, ...prev])
  }

  const deleteChecklistItem = (id) => {
    setChecklistItems((prev) =>
      prev.filter((i) => i.id !== id)
    )
  }

  // NOTES
  const [notes, setNotes] = useState([])

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev])
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <AppDataContext.Provider
      value={{
        symptoms,
        addSymptom,
        deleteSymptom,

        medicines,
        addMedicine,
        deleteMedicine,

        checklistItems,
        addChecklistItem,
        deleteChecklistItem,

        notes,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

/**
 * ✅ ONLY hook screens are allowed to use
 */
export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) {
    throw new Error(
      "useAppData must be used within AppDataProvider"
    )
  }
  return ctx
}
