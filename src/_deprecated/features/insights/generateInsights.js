export function generateInsights(symptoms = []) {
  if (!symptoms.length) return []

  const insights = []

  // --- 1. Repeated symptom insight ---
  const symptomCounts = symptoms.reduce((acc, s) => {
    acc[s.symptom] = (acc[s.symptom] || 0) + 1
    return acc
  }, {})

  Object.entries(symptomCounts).forEach(([symptom, count]) => {
    if (count >= 3) {
      insights.push({
        type: "repeat",
        message: `You’ve noticed ${symptom} a few times recently.`,
      })
    }
  })

  // --- 2. Recent clustering insight ---
  const recent = symptoms.filter((s) => {
    const d = new Date(s.date)
    const daysAgo = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)
    return daysAgo <= 7
  })

  if (recent.length >= 5) {
    insights.push({
      type: "recent",
      message:
        "You’ve been tracking symptoms more often lately. That awareness can be helpful.",
    })
  }

  // --- 3. Condition-linked pattern ---
  const conditionMap = {}
  recent.forEach((s) => {
    if (!s.conditionId) return
    conditionMap[s.conditionId] =
      (conditionMap[s.conditionId] || 0) + 1
  })

  Object.values(conditionMap).forEach((count) => {
    if (count >= 3) {
      insights.push({
        type: "condition",
        message:
          "Some symptoms seem to gather around a condition you’re tracking.",
      })
    }
  })

  return insights.slice(0, 3) // cap to avoid overload
}
