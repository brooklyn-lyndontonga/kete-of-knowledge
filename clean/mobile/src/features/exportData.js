import { getDB } from "../db"

const TABLES = [
  "profiles",
  "goals",
  "symptoms",
  "medicines",
  "notes",
  "reminders",
  "checklists",
  "checklist_items",
  "contacts",
]

/**
 * Builds a single JSON object containing everything stored on this device.
 * Backs "Export my data" in Settings.
 */
export async function buildDataExport() {
  const db = await getDB()
  const data = {}

  for (const table of TABLES) {
    try {
      data[table] = await db.getAllAsync(`SELECT * FROM ${table};`)
    } catch {
      data[table] = []
    }
  }

  return {
    app: "Kete of Knowledge",
    exported_at: new Date().toISOString(),
    data,
  }
}

export async function buildDataExportString() {
  return JSON.stringify(await buildDataExport(), null, 2)
}
