import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function connectDB() {
  return open({ filename: "./database.db", driver: sqlite3.Database })
}

export async function initTables(db) {
  await db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    goals TEXT
  );
  CREATE TABLE IF NOT EXISTS symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    symptom TEXT,
    intensity INTEGER,
    notes TEXT,
    date TEXT
  );
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    goal_text TEXT,
    completed INTEGER DEFAULT 0
  );
  `)
}

