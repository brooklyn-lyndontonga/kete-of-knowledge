import { getDB } from "../db/db.js"

export async function listLibrary(req, res) {
  const db = getDB()
  const rows = await db.all(
    "SELECT * FROM library_items"
  )
  res.json(rows)
}
