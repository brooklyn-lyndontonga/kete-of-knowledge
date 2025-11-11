// server/models/goalsModel.js
export async function getGoals(db) {
  return db.all("SELECT * FROM goals")
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
