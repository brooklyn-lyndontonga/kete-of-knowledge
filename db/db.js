import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

let db = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 👇 path to your actual sqlite file
const DB_PATH = path.join(__dirname, "database.db")

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

export function getDB() {
  if (!db) {
    throw new Error("DB not initialised. Call initDB() first.")
  }
  return db
}
