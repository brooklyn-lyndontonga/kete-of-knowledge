// server/models/symptomsModel.js

export async function getSymptoms(db) {
  return db.all("SELECT * FROM symptoms")
}

export async function createSymptom(db, { name, severity }) {
  await db.run("INSERT INTO symptoms (name, severity) VALUES (?, ?)", [name, severity])
}

export async function updateSymptom(db, id, data) {
  const { name, severity } = data
  await db.run("UPDATE symptoms SET name=?, severity=? WHERE id=?", [name, severity, id])
}

export async function deleteSymptom(db, id) {
  await db.run("DELETE FROM symptoms WHERE id=?", [id])
}
