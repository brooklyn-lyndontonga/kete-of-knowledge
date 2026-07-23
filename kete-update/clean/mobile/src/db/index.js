import { openDatabaseAsync } from "expo-sqlite"
import { schema, migrations } from "./schema"

const DB_NAME = "kete.db"

let dbPromise = null
let ready = false

/**
 * Single shared connection for the whole app.
 * Everything (including notes) now lives in one database file.
 */
export function getDB() {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync(DB_NAME)
  }
  return dbPromise
}

async function columnExists(db, table, column) {
  const cols = await db.getAllAsync(`PRAGMA table_info(${table});`)
  return cols.some((c) => c.name === column)
}

async function runMigrations(db) {
  for (const { table, column, type } of migrations) {
    try {
      if (!(await columnExists(db, table, column))) {
        await db.execAsync(`ALTER TABLE ${table} ADD COLUMN ${column} ${type};`)
      }
    } catch (err) {
      // A missing table here is fine - CREATE TABLE IF NOT EXISTS above
      // will have made it with the column already present.
      console.warn(`Migration skipped: ${table}.${column}`, err?.message)
    }
  }
}

/**
 * Create tables and apply migrations. Safe to call more than once.
 */
export async function initDB() {
  const db = await getDB()

  await db.execAsync("PRAGMA journal_mode = WAL;")
  await db.execAsync("PRAGMA foreign_keys = ON;")
  await db.execAsync(schema)
  await runMigrations(db)

  // Rows created before sync existed have no uuid. Backfill so an
  // existing install keeps its data when it first syncs.
  const { backfillUuids } = await import("./records")
  await backfillUuids([
    "profiles",
    "goals",
    "symptoms",
    "medicines",
    "notes",
    "reminders",
    "checklists",
    "checklist_items",
    "contacts",
  ])

  ready = true
  return db
}

export function isReady() {
  return ready
}

/**
 * Removes every row of personal data from the device.
 * Used by "Delete my data" in Settings.
 */
export async function wipeLocalData() {
  const db = await getDB()

  await db.withTransactionAsync(async () => {
    await db.execAsync(`
      DELETE FROM checklist_items;
      DELETE FROM checklists;
      DELETE FROM reminders;
      DELETE FROM notes;
      DELETE FROM medicines;
      DELETE FROM symptoms;
      DELETE FROM goals;
      DELETE FROM contacts;
      DELETE FROM profiles;
      DELETE FROM consent;
      DELETE FROM app_state;
    `)
  })
}
