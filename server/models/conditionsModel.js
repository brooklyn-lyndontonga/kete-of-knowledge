import db from "../db/database.js";

export async function getAllConditions() {
  const rows = await db.all("SELECT * FROM conditions ORDER BY name ASC");

  return rows.map((row) => ({
    ...row,
    triggers: row.triggers ? JSON.parse(row.triggers) : [],
    treatments: row.treatments ? JSON.parse(row.treatments) : [],
    images: row.images ? JSON.parse(row.images) : [],
  }));
}

export async function getConditionById(id) {
  const row = await db.get("SELECT * FROM conditions WHERE id = ?", [id]);
  if (!row) return null;

  return {
    ...row,
    triggers: row.triggers ? JSON.parse(row.triggers) : [],
    treatments: row.treatments ? JSON.parse(row.treatments) : [],
    images: row.images ? JSON.parse(row.images) : [],
  };
}

export async function createCondition(data) {
  const { name, description, triggers = [], treatments = [], images = [] } = data;

  const result = await db.run(
    `INSERT INTO conditions (name, description, triggers, treatments, images)
     VALUES (?, ?, ?, ?, ?)`,
    [
      name,
      description,
      JSON.stringify(triggers),
      JSON.stringify(treatments),
      JSON.stringify(images)
    ]
  );

  return getConditionById(result.lastID);
}

export async function updateCondition(id, data) {
  const existing = await getConditionById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...data,
  };

  await db.run(
    `UPDATE conditions
     SET name = ?, description = ?, triggers = ?, treatments = ?, images = ?
     WHERE id = ?`,
    [
      updated.name,
      updated.description,
      JSON.stringify(updated.triggers),
      JSON.stringify(updated.treatments),
      JSON.stringify(updated.images),
      id
    ]
  );

  return getConditionById(id);
}

export async function deleteCondition(id) {
  await db.run("DELETE FROM conditions WHERE id = ?", [id]);
  return true;
}
