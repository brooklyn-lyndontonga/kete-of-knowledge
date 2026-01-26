import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

let db = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, "database.db")

// --------------------
// Init DB connection
// --------------------
export async function initDB() {
  if (db) return db

  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  })

  console.log("🗂 Using DB:", DB_PATH)
  console.log("✅ Database opened")

  return db
}

// --------------------
// Init schema (tables)
// --------------------
export async function initSchema() {
  const db = await initDB()

  await db.exec(`
    CREATE TABLE IF NOT EXISTS whakatauki (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      translation TEXT,
      theme TEXT,
      source TEXT
    );

    CREATE TABLE IF NOT EXISTS reflection_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      prompt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profile_seeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      triggers TEXT,
      treatments TEXT
    );
  `)

  console.log("📦 Database schema ready")
}

// --------------------
// Getter (used by controllers)
// --------------------
export function getDB() {
  if (!db) {
    throw new Error("DB not initialised. Call initSchema() first.")
  }
  return db
}
