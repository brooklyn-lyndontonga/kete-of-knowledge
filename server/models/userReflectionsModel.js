// server/models/userReflectionsModel.js

export async function listUserReflections(db) {
  return db.all(`SELECT * FROM user_reflections ORDER BY created_at DESC`)
}

export async function createUserReflection(db, body) {
  const { title, message } = body
  await db.run(
    `INSERT INTO user_reflections (title, message) VALUES (?, ?)`,
    [title, message]
  )
  return { title, message }
}

export async function deleteUserReflection(db, id) {
  await db.run(`DELETE FROM user_reflections WHERE id = ?`, [id])
  return true
}
