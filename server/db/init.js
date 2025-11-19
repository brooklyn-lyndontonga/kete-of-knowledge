// server/db/init.js
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function connectDB() {
  const dbPath = path.join(__dirname, "database.db")

  console.log("🗂 Using DB:", dbPath)

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  return db
}

export async function initTables(db) {
  console.log("📦 Initializing tables...")

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        goals TEXT
      );

      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS symptoms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        symptom TEXT,
        severity INTEGER,
        notes TEXT
      );

      CREATE TABLE IF NOT EXISTS mymedicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dosage TEXT,
        frequency TEXT
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        notes TEXT
      );
    `)

    console.log("✅ Tables initialized")
  } catch (err) {
    console.error("❌ TABLE INIT ERROR:", err)
  }
}
