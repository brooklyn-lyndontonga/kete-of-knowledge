// server/models/conditionsModel.js

const demoConditions = [
  {
    id: 1,
    name: "Hypertension (High Blood Pressure)",
    category: "Cardiovascular",
    description: "A condition where blood pressure remains consistently high.",
    symptoms: "Headaches, shortness of breath, dizziness.",
    management: "Regular exercise, reduced salt intake, medications as prescribed.",
  },
  {
    id: 2,
    name: "Type 2 Diabetes",
    category: "Metabolic",
    description: "A chronic condition affecting the body's ability to process sugar.",
    symptoms: "Fatigue, thirst, frequent urination, blurred vision.",
    management: "Diet, exercise, blood sugar monitoring, medications.",
  },
  {
    id: 3,
    name: "Asthma",
    category: "Respiratory",
    description: "A respiratory condition causing difficulty breathing.",
    symptoms: "Wheezing, chest tightness, coughing.",
    management: "Avoid triggers, inhalers, regular check-ups.",
  }
]

export function getAllConditions() {
  return demoConditions
}

export function getConditionById(id) {
  return demoConditions.find(c => c.id === Number(id)) || null
}
