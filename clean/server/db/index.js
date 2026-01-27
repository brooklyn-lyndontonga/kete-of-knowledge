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

// 🔑 THIS IS WHAT ROUTES SHOULD USE
export async function getDB() {
  return initDB()
}

// --------------------
// Init schema
// --------------------
export async function initSchema() {
  const db = await initDB()

  await db.exec(`
    CREATE TABLE IF NOT EXISTS snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT,
      energy TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

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

    CREATE TABLE IF NOT EXISTS learning_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT,
      file_path TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS library_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS learning_resource_categories (
      resource_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      PRIMARY KEY (resource_id, category_id),
      FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES library_categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      triggers TEXT,
      treatments TEXT
    );
  `)

  await db.exec(`
    INSERT OR IGNORE INTO library_categories (key, title, description)
    VALUES
      ('learn', 'Learn', 'Information to read, watch, or understand'),
      ('practice', 'Practice', 'Activities, exercises, or things to try'),
      ('support', 'Support', 'Help, guidance, and support resources');
  `)

  console.log("📦 Database schema ready")
}
