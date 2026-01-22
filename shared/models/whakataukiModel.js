import { getDB } from "../../db/database.js"

export async function getAllWhakatauki() {
  const db = getDB()
  return db.all("SELECT * FROM whakatauki")
}

export async function getDailyWhakatauki() {
  const db = getDB()
  return db.get(
    "SELECT * FROM whakatauki ORDER BY RANDOM() LIMIT 1"
  )
}
