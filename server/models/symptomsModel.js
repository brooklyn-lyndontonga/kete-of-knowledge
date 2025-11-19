// server/models/symptomsModel.js

let demoSymptoms = [
  {
    id: 1,
    date: "2025-01-15",
    symptom: "Fatigue",
    severity: 3,
    notes: "Felt tired after lunch"
  },
  {
    id: 2,
    date: "2025-01-15",
    symptom: "Shortness of breath",
    severity: 2,
    notes: ""
  },
  {
    id: 3,
    date: "2025-01-14",
    symptom: "Chest tightness",
    severity: 4,
    notes: "During walking"
  }
]

export function getAllSymptoms() {
  return demoSymptoms
}

export function addSymptom({ date, symptom, severity, notes }) {
  const newEntry = {
    id: Date.now(),
    date,
    symptom,
    severity,
    notes,
  }
  demoSymptoms.push(newEntry)
  return newEntry
}

export function deleteSymptom(id) {
  demoSymptoms = demoSymptoms.filter(i => i.id !== Number(id))
  return true
}

export function getSymptomSummary() {
  const summary = {}

  demoSymptoms.forEach(item => {
    if (!summary[item.date]) summary[item.date] = []
    summary[item.date].push(item)
  })

  return summary
}
