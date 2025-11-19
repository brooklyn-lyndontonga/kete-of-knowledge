// server/models/goalsModel.js
export async function getGoals() {
  return [
    { id: 1, title: "Drink 2 litres of water", progress: 40 },
    { id: 2, title: "Walk 3x per week", progress: 60 },
    { id: 3, title: "Take medication on time", progress: 80 }
  ]
}


export async function createGoal(db, { title, description }) {
  await db.run(
    "INSERT INTO goals (title, description) VALUES (?, ?)",
    [title, description]
  )
}

export async function updateGoal(db, id, data) {
  const { title, description } = data
  await db.run(
    "UPDATE goals SET title=?, description=? WHERE id=?",
    [title, description, id]
  )
}

export async function deleteGoal(db, id) {
  await db.run("DELETE FROM goals WHERE id=?", [id])
}
