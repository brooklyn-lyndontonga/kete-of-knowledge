import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

// Resolve project root reliably
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// db/ is one level down from project root, so go UP one
const PROJECT_ROOT = path.resolve(__dirname, "..")

let dbInstance = null

export async function initDB() {
  if (dbInstance) return dbInstance

  // ✅ ALWAYS points to /kete-of-knowledge/db/database.db
  const dbPath = path.join(PROJECT_ROOT, "db", "database.db")
  console.log("🗂 Using shared DB:", dbPath)

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resource_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT,
      description TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      image TEXT,
      categoryId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES resource_categories(id)
    );

    CREATE TABLE IF NOT EXISTS conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      triggers TEXT,
      treatments TEXT,
      images TEXT
    );

    CREATE TABLE IF NOT EXISTS reflection_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      title TEXT,
      prompt TEXT
    );

    CREATE TABLE IF NOT EXISTS whakatauki (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      translation TEXT,
      theme TEXT,
      source TEXT
    );

    CREATE TABLE IF NOT EXISTS support_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      role TEXT,
      organisation TEXT,
      phone TEXT,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symptom TEXT,
      severity INTEGER,
      notes TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT,
      energy TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log("✅ Database ready")
  dbInstance = db
  return db
}

export function getDB() {
  if (!dbInstance) {
    throw new Error("DB not initialised. Call initDB() first.")
  }
  return dbInstance
}
