// server/models/userReflectionsModel.js
export async function getUserReflections(db) {
  return db.all(`
    SELECT * FROM user_reflections ORDER BY created_at DESC
  `)
}

export async function createUserReflection(db, { title, story }) {
  return db.run(
    `
    INSERT INTO user_reflections (title, story)
    VALUES (?, ?)
  `,
    [title, story]
  )
}

export async function deleteUserReflection(db, id) {
  return db.run(`DELETE FROM user_reflections WHERE id = ?`, [id])
}
