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
    // ====================================================
    // USER-GENERATED CONTENT (admin cannot modify)
    // ====================================================
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
    `)

    // ====================================================
    // ADMIN-EDITABLE STATIC CONTENT
    // ====================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS resource_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT
      );

      CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        image_url TEXT,
        FOREIGN KEY (category_id) REFERENCES resource_categories(id)
      );

      CREATE TABLE IF NOT EXISTS conditions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        symptoms TEXT,
        treatments TEXT
      );

      CREATE TABLE IF NOT EXISTS whakatauki (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        translation TEXT
      );

      CREATE TABLE IF NOT EXISTS reflections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        message TEXT
      );

      CREATE TABLE IF NOT EXISTS snapshots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT,
        percentage INTEGER
      );

      CREATE TABLE IF NOT EXISTS support_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        desc TEXT,
        phone TEXT,
        emoji TEXT
      );

      CREATE TABLE IF NOT EXISTS profile_seeds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        value TEXT
      );
    `)

    // ====================================================
    // DEFAULT SEED DATA
    // ====================================================
    await seedDefaults(db)

    console.log("✅ Tables initialized & defaults seeded")
  } catch (err) {
    console.error("❌ TABLE INIT ERROR:", err)
  }
}

async function seedDefaults(db) {
  console.log("🌱 Seeding default admin content...")

  // ---- Support contacts ----
  const supportCount = await db.get(
    "SELECT COUNT(*) as total FROM support_contacts"
  )
  if (supportCount.total === 0) {
    await db.run(`
      INSERT INTO support_contacts (name, desc, phone, emoji) VALUES
      ("Healthline", "24/7 free medical advice", "0800611116", "🩺"),
      ("Emergency Services", "Call in life-threatening situations", "111", "🚑"),
      ("1737 – Need to Talk?", "Free mental health support", "1737", "💬"),
      ("Quitline", "Support to stop smoking", "0800778778", "🚭")
    `)
  }

  // ---- Reflection ----
  const reflections = await db.get(
    "SELECT COUNT(*) as total FROM reflections"
  )
  if (reflections.total === 0) {
    await db.run(`
      INSERT INTO reflections (title, message)
      VALUES ("Weekly Reflection", "Your whānau is on a hauora journey — each step counts.")
    `)
  }

  // ---- Snapshot ----
  const snaps = await db.get("SELECT COUNT(*) as total FROM snapshots")
  if (snaps.total === 0) {
    await db.run(`
      INSERT INTO snapshots (label, percentage)
      VALUES ("Weekly Check-ins", 40)
    `)
  }

  // ---- Whakataukī ----
  const w = await db.get("SELECT COUNT(*) as total FROM whakatauki")
  if (w.total === 0) {
    await db.run(`
      INSERT INTO whakatauki (text, translation) VALUES
      ("He kakano ahau i ruia mai i Rangiātea", "I am a seed born of greatness"),
      ("Whaia te iti kahurangi", "Pursue excellence"),
      ("Ko te pae tawhiti whaia kia tata", "Seek out the distant horizon")
    `)
  }

  console.log("🌿 Default content ready")
}
