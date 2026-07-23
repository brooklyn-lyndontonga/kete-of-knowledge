import { getDB } from "../db"

export async function addSymptom({ symptom, severity = null, notes = "", tags = "" }) {
  const db = await getDB()
  const loggedAt = new Date().toISOString()

  const result = await db.runAsync(
    `INSERT INTO symptoms (symptom, severity, notes, tags, logged_at)
     VALUES (?, ?, ?, ?, ?);`,
    [symptom, severity, notes, tags, loggedAt]
  )

  return { id: result.lastInsertRowId, symptom, severity, notes, tags, logged_at: loggedAt }
}

export async function getSymptoms() {
  const db = await getDB()
  return db.getAllAsync(`SELECT * FROM symptoms ORDER BY logged_at DESC;`)
}

/**
 * Symptoms for the 7 days ending today, grouped by date key (YYYY-MM-DD).
 * Backs the weekly grid on the symptoms hub.
 */
export async function getSymptomsForWeek(endDate = new Date()) {
  const db = await getDB()

  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)
  const start = new Date(end)
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const rows = await db.getAllAsync(
    `SELECT * FROM symptoms
     WHERE logged_at >= ? AND logged_at <= ?
     ORDER BY logged_at ASC;`,
    [start.toISOString(), end.toISOString()]
  )

  const days = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days[d.toISOString().slice(0, 10)] = []
  }

  for (const row of rows) {
    const key = String(row.logged_at).slice(0, 10)
    if (days[key]) days[key].push(row)
  }

  return days
}

export async function deleteSymptom(id) {
  const db = await getDB()
  await db.runAsync(`DELETE FROM symptoms WHERE id = ?;`, [id])
}
