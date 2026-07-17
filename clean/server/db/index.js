import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcryptjs"

// --------------------------------------------------
// SQLite singleton connection
// --------------------------------------------------

import fs from "fs"

let db = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultDbPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "../data/database.db")
    : fs.existsSync(path.join(__dirname, "database.db"))
    ? path.join(__dirname, "database.db")
    : path.join(__dirname, "../data/database.db")

const DB_PATH = process.env.SQLITE_DB_PATH || defaultDbPath

// --------------------------------------------------
// Init DB connection (singleton)
// --------------------------------------------------
export async function initDB() {
  if (db) return db

  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  })

  console.log("🗂 Using DB:", DB_PATH)
  console.log("✅ Database opened")

  return db
}

// 🔑 All routes should call this
export async function getDB() {
  return initDB()
}

// --------------------------------------------------
// Init schema (safe to run on every startup)
// --------------------------------------------------
export async function initSchema() {
  const db = await initDB()

  // Enable Write-Ahead Logging for much better concurrency / performance
  await db.exec(`PRAGMA journal_mode = WAL;`)
  // Enable foreign key support
  await db.exec(`PRAGMA foreign_keys = ON;`)

  await db.exec(`
    -- ======================
    -- Admin / App Shared Tables
    -- ======================

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
      source TEXT,
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      archived INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reflection_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      prompt TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      archived INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS profile_seeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      archived INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS learning_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT,
      file_path TEXT,
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      archived INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- ======================
    -- Library Categorisation
    -- ======================

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
      FOREIGN KEY (resource_id)
        REFERENCES learning_resources(id)
        ON DELETE CASCADE,
      FOREIGN KEY (category_id)
        REFERENCES library_categories(id)
        ON DELETE CASCADE
    );

    -- Create secondary index for faster querying by category
    CREATE INDEX IF NOT EXISTS idx_lrc_category ON learning_resource_categories(category_id);

    -- ======================
    -- Conditions / Education
    -- ======================

    CREATE TABLE IF NOT EXISTS conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      triggers TEXT,
      treatments TEXT,
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      archived INTEGER DEFAULT 0
    );

    -- ======================
    -- Admin Auth
    -- ======================

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- ======================
    -- App User Auth
    -- ======================

    CREATE TABLE IF NOT EXISTS app_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      name TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS magic_link_tokens (
      token TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      expiresAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_password_resets (
      token TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      expiresAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      tableName TEXT NOT NULL,
      recordId INTEGER NOT NULL,
      details TEXT,
      performedBy TEXT DEFAULT 'Admin',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Migration logic: add columns if they don't exist in existing tables
  const tablesToMigrate = ["whakatauki", "reflection_templates", "profile_seeds", "learning_resources", "conditions"];
  for (const table of tablesToMigrate) {
    try {
      await db.exec(`ALTER TABLE ${table} ADD COLUMN status TEXT DEFAULT 'draft';`)
    } catch (_err) {
      // Column already exists
    }
    try {
      await db.exec(`ALTER TABLE ${table} ADD COLUMN sort_order INTEGER DEFAULT 0;`)
    } catch (_err) {
      // Column already exists
    }
    try {
      await db.exec(`ALTER TABLE ${table} ADD COLUMN archived INTEGER DEFAULT 0;`)
    } catch (_err) {
      // Column already exists
    }
  }

  // Admin users migration: add role column
  try {
    await db.exec(`ALTER TABLE admin_users ADD COLUMN role TEXT DEFAULT 'editor';`)
  } catch (_err) {
    // Column already exists
  }

  // Seed base library categories (safe to re-run)
  await db.exec(`
    INSERT OR IGNORE INTO library_categories (key, title, description)
    VALUES
      ('learn', 'Learn', 'Information to read, watch, or understand'),
      ('practice', 'Practice', 'Activities, exercises, or things to try'),
      ('support', 'Support', 'Help, guidance, and support resources');
  `)

  await seedAdminUser(db)

  console.log("📦 Database schema ready")
}

async function seedAdminUser(db) {
  const emailStr = process.env.ADMIN_SEED_EMAIL
  const passwordStr = process.env.ADMIN_SEED_PASSWORD
  const roleStr = process.env.ADMIN_SEED_ROLE || "admin"

  if (!emailStr || !passwordStr) return

  const emails = emailStr.split(",").map((e) => e.trim())
  const passwords = passwordStr.split(",").map((p) => p.trim())
  const roles = roleStr.split(",").map((r) => r.trim())

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i]
    // Fallback to the first password/role if not enough are provided
    const password = passwords[i] || passwords[0]
    const role = roles[i] || roles[0] || "admin"

    if (!email || !password) continue

    const passwordHash = await bcrypt.hash(password, 10)

    const existing = await db.get(
      "SELECT id FROM admin_users WHERE email = ?",
      email
    )

    if (existing) {
      await db.run(
        "UPDATE admin_users SET password_hash = ?, role = ? WHERE email = ?",
        passwordHash,
        role,
        email
      )
      console.log("🔐 Updated admin password hash and role for:", email)
    } else {
      await db.run(
        "INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)",
        email,
        passwordHash,
        role
      )
      console.log("🔐 Seeded admin user:", email, `(${role})`)
    }
  }
}
