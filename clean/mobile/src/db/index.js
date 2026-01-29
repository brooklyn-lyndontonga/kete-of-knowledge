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

  schema
    .split(";")
    .map(s => s.trim())
    .filter(Boolean)
    .forEach((statement) => {
      db.execSync(statement);
    });
}
