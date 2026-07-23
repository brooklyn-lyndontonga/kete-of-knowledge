import { getDB } from "../db"
import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"

export async function addSymptom({
  symptom,
  severity = null,
  notes = "",
  tags = "",
}) {
  return insertRecord("symptoms", {
    symptom,
    severity,
    notes,
    tags,
    logged_at: new Date().toISOString(),
  })
}

export async function getSymptoms() {
  return listRecords("symptoms", { orderBy: "logged_at DESC" })
}

export async function updateSymptom(id, fields) {
  return updateRecord("symptoms", id, fields)
}

export async function deleteSymptom(id) {
  return softDeleteRecord("symptoms", id)
}

/**
 * Symptoms for the 7 days ending on endDate, keyed by YYYY-MM-DD.
 * Every day in range is present, empty days included, so the grid
 * can render a full week without gaps.
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
     WHERE deleted_at IS NULL AND logged_at >= ? AND logged_at <= ?
     ORDER BY logged_at ASC;`,
    [start.toISOString(), end.toISOString()]
  )

  const days = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days[toKey(d)] = []
  }

  for (const row of rows) {
    const key = String(row.logged_at).slice(0, 10)
    if (days[key]) days[key].push(row)
  }

  return { days, start, end }
}

export function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}
