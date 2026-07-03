import { openDatabaseSync } from "expo-sqlite";
import { schema } from "./schema";

let db;

export function getDB() {
  if (!db) {
    db = openDatabaseSync("kete.db");
  }
  return db;
}

export function initDB() {
  const db = getDB();

  // Enable foreign key enforcement (needed for checklist_items cascade)
  db.execSync("PRAGMA foreign_keys = ON;");

  schema
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((statement) => {
      db.execSync(statement);
    });

  // ------------------------------------------------------------------
  // Lightweight migrations for installs created before these columns
  // existed. CREATE TABLE IF NOT EXISTS won't add columns to existing
  // tables, so we ALTER and swallow the "duplicate column" error.
  // ------------------------------------------------------------------
  const migrations = [
    "ALTER TABLE notes ADD COLUMN updated_at TEXT;",
  ];

  for (const migration of migrations) {
    try {
      db.execSync(migration);
    } catch (_err) {
      // Column already exists — nothing to do
    }
  }
}
