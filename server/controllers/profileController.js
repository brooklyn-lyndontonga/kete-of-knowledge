import { getDB } from "../../db/database.js"

export async function getProfile(req, res) {
  const db = getDB()

  const row = await db.get(
    "SELECT name, goals FROM profiles WHERE active = 1"
  )

  res.json(row ?? {})
}

export async function saveProfile(req, res) {
  const { name, goals } = req.body
  const db = getDB()

  await db.run(
    `
    INSERT INTO profiles (id, name, goals, active)
    VALUES (1, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      goals = excluded.goals
    `,
    [name ?? null, goals ?? null]
  )

  res.json({ success: true })
}
