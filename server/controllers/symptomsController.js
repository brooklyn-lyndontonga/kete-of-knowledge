import { getDB } from "../db/db.js"

// =======================
// GET ALL SYMPTOMS
// GET /symptoms
// =======================
export async function listSymptoms(req, res) {
  const db = getDB()
  const rows = await db.all(
    "SELECT * FROM symptoms ORDER BY date DESC"
  )
  res.json(rows)
}

// =======================
// GET LATEST SYMPTOM (MVP)
// GET /symptoms/latest
// =======================
export async function getLatestSymptom(req, res) {
  const db = getDB()

  const row = await db.get(`
    SELECT *
    FROM symptoms
    ORDER BY date DESC
    LIMIT 1
  `)

  res.json(row ?? null)
}

// =======================
// CREATE SYMPTOM
// POST /symptoms
// =======================
export async function createSymptom(req, res) {
  const { symptom, severity, notes, date } = req.body
  const db = getDB()

  await db.run(
    `
    INSERT INTO symptoms (symptom, severity, notes, date)
    VALUES (?, ?, ?, ?)
    `,
    [symptom, severity, notes, date]
  )

  res.json({ success: true })
}

// =======================
// DELETE SYMPTOM (MVP)
// DELETE /symptoms/:id
// =======================
export async function removeSymptom(req, res) {
  const db = getDB()

  await db.run(
    "DELETE FROM symptoms WHERE id = ?",
    req.params.id
  )

  res.json({ success: true })
}
