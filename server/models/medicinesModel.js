// server/models/medicinesModel.js

const demoMedicineLibrary = [
  {
    id: 1,
    name: "Metformin",
    category: "Diabetes",
    description: "Helps control blood sugar levels.",
    dosageInfo: "Usually taken 1–3 times daily with food.",
    sideEffects: "Nausea, stomach upset, diarrhoea.",
  },
  {
    id: 2,
    name: "Ventolin Inhaler",
    category: "Asthma",
    description: "Relieves breathing difficulty by opening airways.",
    dosageInfo: "2 puffs as needed.",
    sideEffects: "Tremors, fast heartbeat.",
  },
  {
    id: 3,
    name: "Lisinopril",
    category: "Blood Pressure",
    description: "Helps lower blood pressure.",
    dosageInfo: "Typically 10–40mg daily.",
    sideEffects: "Dry cough, dizziness.",
  }
]

export function getAllMedicines() {
  return demoMedicineLibrary
}

export function getMedicineById(id) {
  return demoMedicineLibrary.find(m => m.id === Number(id)) || null
}
