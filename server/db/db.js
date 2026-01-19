/* eslint-disable no-undef */
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"

let dbInstance = null

export async function initDB() {
  if (dbInstance) return dbInstance

  const dbPath = path.join(process.cwd(), "db/database.db")
  console.log("🔥 DB Path:", dbPath)

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY,
      name TEXT,
      goals TEXT,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symptom TEXT,
      severity INTEGER,
      notes TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS reflection_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT
    );

    CREATE TABLE IF NOT EXISTS conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );

    CREATE TABLE IF NOT EXISTS whakatauki (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      translation TEXT
    );
  `)

  dbInstance = db
  console.log("🔥 DB Ready & Tables Loaded")
  return db
}

export function getDB() {
  if (!dbInstance) {
    throw new Error("DB not initialised. Call initDB() first.")
  }
  return dbInstance
}
