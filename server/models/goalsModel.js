// Temporary in-memory demo data
let demoGoals = [
  { id: 1, title: "Drink 2 litres of water", progress: 40 },
  { id: 2, title: "Walk 3x per week", progress: 60 },
  { id: 3, title: "Take medication on time", progress: 80 }
]

export function getGoals() {
  return demoGoals
}

export function addGoal(title) {
  const newGoal = {
    id: Date.now(),
    title,
    progress: 0,
  }
  demoGoals.push(newGoal)
  return newGoal
}

export function deleteGoal(id) {
  demoGoals = demoGoals.filter((g) => g.id !== Number(id))
  return true
}
