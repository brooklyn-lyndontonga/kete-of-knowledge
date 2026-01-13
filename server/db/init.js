// server/db/init.js
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcryptjs"

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
    // ------------------------------------
    // USER-GENERATED CONTENT
    // ------------------------------------
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

      CREATE TABLE IF NOT EXISTS user_reflections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        template_id INTEGER,
        user_id TEXT,
        response TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (template_id) REFERENCES reflection_templates(id)
      );
    `)

    // ------------------------------------
    // ADMIN EDITABLE CONTENT
    // ------------------------------------
    await db.exec(`
      CREATE TABLE IF NOT EXISTS resource_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT
      );

      -- Admins table
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
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
        triggers TEXT,
        treatments TEXT,
        images TEXT
      );

      CREATE TABLE IF NOT EXISTS whakatauki (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        translation TEXT
      );

      CREATE TABLE IF NOT EXISTS support_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        desc TEXT,
        phone TEXT,
        emoji TEXT
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
        value TEXT
      );

      CREATE TABLE IF NOT EXISTS snapshots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        percentage INTEGER NOT NULL,
        color TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await seedDefaults(db)

    console.log("✅ Tables initialized + seeded")
  } catch (err) {
    console.error("❌ TABLE INIT ERROR:", err)
  }
}

async function seedDefaults(db) {
  console.log("🌱 Seeding defaults...")

  // ---- Support services ----
  const support = await db.get("SELECT COUNT(*) AS total FROM support_contacts")
  if (support.total === 0) {
    await db.run(`
      INSERT INTO support_contacts (name, desc, phone, emoji) VALUES
      ("Healthline", "24/7 free medical advice", "0800611116", "🩺"),
      ("Emergency Services", "Call in life-threatening situations", "111", "🚑"),
      ("1737 – Need to Talk?", "Free mental health support", "1737", "💬"),
      ("Quitline", "Support to stop smoking", "0800778778", "🚭")
    `)
  }

  // ---- Reflection templates ----
  const refl = await db.get("SELECT COUNT(*) AS total FROM reflection_templates")
  if (refl.total === 0) {
    await db.run(`
      INSERT INTO reflection_templates (category, title, prompt) VALUES
      ("daily", "Daily Reflection", "What is one thing you did today that supported your hauora?"),
      ("weekly", "Weekly Review", "Looking back on your week, what are you proud of?")
    `)
  }

  // ---- Whakatauki ----
  const w = await db.get("SELECT COUNT(*) AS total FROM whakatauki")
  if (w.total === 0) {
    await db.run(`
      INSERT INTO whakatauki (text, translation) VALUES
      ("He kakano ahau i ruia mai i Rangiātea", "I am a seed born of greatness"),
      ("Whaia te iti kahurangi", "Pursue excellence"),
      ("Ko te pae tawhiti whaia kia tata", "Seek out the distant horizon")
    `)
  }

    // ---- Resource Categories ----
  const catCount = await db.get(
    "SELECT COUNT(*) AS total FROM resource_categories"
  )

  if (catCount.total === 0) {
    await db.run(`
      INSERT INTO resource_categories (name, icon) VALUES
      ("Rongoā Māori", "🌿"),
      ("Mental Wellbeing", "🧠"),
      ("Physical Health", "💪"),
      ("Kai & Nutrition", "🥗"),
      ("Whānau Support", "👨‍👩‍👧‍👦")
    `)
  }

  // ---- Admin user ----
  const adminCount = await db.get("SELECT COUNT(*) AS total FROM admins")
  if (adminCount.total === 0) {
    const email = "admin@example.com"
    const plainPassword = "KeteAdmin123!"
    const name = "Default Admin"

    const passwordHash = await bcrypt.hash(plainPassword, 10)

    await db.run(
      `
      INSERT INTO admins (name, email, password_hash)
      VALUES (?, ?, ?)
      `,
      [name, email, passwordHash]
    )

    console.log(`👤 Seeded default admin: ${email} / ${plainPassword}`)
  }

  console.log("🌿 Default content seeded")
}
