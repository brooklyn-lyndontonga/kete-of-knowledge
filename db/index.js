/* eslint-disable no-undef */
// db/index.js
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"

let db

export async function initDB() {
  if (db) return db

  const dbPath = path.join(process.cwd(), "db/database.db")

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  return db
}

export function getDB() {
  if (!db) {
    throw new Error("DB not initialised. Call initDB() first.")
  }
  return db
}
