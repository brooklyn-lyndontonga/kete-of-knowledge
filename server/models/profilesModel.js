// server/models/profilesModel.js
export async function getProfiles(db) {
  return db.all("SELECT * FROM profiles")
}

export async function createProfile(db, { name, age, goals }) {
  await db.run(
    "INSERT INTO profiles (name, age, goals) VALUES (?, ?, ?)",
    [name, age, goals]
  )
}

export async function updateProfile(db, id, data) {
  const { name, age, goals } = data
  await db.run(
    "UPDATE profiles SET name=?, age=?, goals=? WHERE id=?",
    [name, age, goals, id]
  )
}

export async function deleteProfile(db, id) {
  await db.run("DELETE FROM profiles WHERE id=?", [id])
}
