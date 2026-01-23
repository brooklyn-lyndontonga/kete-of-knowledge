import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let db

export async function initDB() {
  if (db) return db

  db = await open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
  })

  console.log("✅ Database ready")
  return db
}

export function getDB() {
  if (!db) {
    throw new Error("DB not initialised — call initDB() first")
  }
  return db
}
