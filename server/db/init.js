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
  console.log("📦 Initializing ALL tables...")

  try {
    await db.exec(`
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
        relationship TEXT
      );

      CREATE TABLE IF NOT EXISTS whakatauki (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        translation TEXT
      );

      CREATE TABLE IF NOT EXISTS library_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        icon TEXT,
        color TEXT
      );

      CREATE TABLE IF NOT EXISTS library_resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        title TEXT,
        content TEXT,
        FOREIGN KEY(category_id) REFERENCES library_categories(id)
      );

      CREATE TABLE IF NOT EXISTS conditions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        summary TEXT
      );

      CREATE TABLE IF NOT EXISTS condition_risks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        condition_id INTEGER,
        risk TEXT,
        FOREIGN KEY(condition_id) REFERENCES conditions(id)
      );

      CREATE TABLE IF NOT EXISTS condition_symptoms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        condition_id INTEGER,
        symptom TEXT,
        FOREIGN KEY(condition_id) REFERENCES conditions(id)
      );

      CREATE TABLE IF NOT EXISTS condition_actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        condition_id INTEGER,
        action TEXT,
        FOREIGN KEY(condition_id) REFERENCES conditions(id)
      );

      CREATE TABLE IF NOT EXISTS home_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT
      );

      CREATE TABLE IF NOT EXISTS settings_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT
      );

      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        goals TEXT
      );
    `)

    console.log("✅ All tables created")
  } catch (err) {
    console.error("❌ TABLE INIT ERROR:", err)
  }
}
