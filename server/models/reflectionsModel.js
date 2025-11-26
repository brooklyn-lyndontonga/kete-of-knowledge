import db from "../db/database.js";

export async function getAllReflections() {
  const rows = await db.all(
    "SELECT * FROM reflections ORDER BY created_at DESC"
  );
  return rows;
}

export async function getLatestReflection() {
  return await db.get(
    `SELECT * FROM reflections
     ORDER BY created_at DESC
     LIMIT 1`
  );
}

export async function getReflectionById(id) {
  return await db.get("SELECT * FROM reflections WHERE id = ?", [id]);
}

export async function createReflection(data) {
  const { title, story, caption } = data;

  const result = await db.run(
    `INSERT INTO reflections (title, story, caption)
     VALUES (?, ?, ?)`,
    [title, story, caption]
  );

  return getReflectionById(result.lastID);
}

export async function updateReflection(id, data) {
  const existing = await getReflectionById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...data,
  };

  await db.run(
    `UPDATE reflections
     SET title = ?, story = ?, caption = ?
     WHERE id = ?`,
    [
      updated.title,
      updated.story,
      updated.caption,
      id
    ]
  );

  return getReflectionById(id);
}

export async function deleteReflection(id) {
  await db.run("DELETE FROM reflections WHERE id = ?", [id]);
  return true;
}
