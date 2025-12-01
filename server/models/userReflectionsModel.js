export async function getUserReflections(db) {
  return db.all("SELECT * FROM user_reflections ORDER BY id DESC")
}

export async function addUserReflection(db, data) {
  const result = await db.run(
    "INSERT INTO user_reflections (text, date) VALUES (?, ?)",
    [data.text, data.date]
  )
  return { id: result.lastID, ...data }
}

export async function deleteUserReflection(db, id) {
  return db.run("DELETE FROM user_reflections WHERE id=?", id)
}
