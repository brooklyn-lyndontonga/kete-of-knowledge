export async function getConditions(db) {
  return db.all("SELECT * FROM conditions ORDER BY name ASC")
}

export async function addCondition(db, { name, description, triggers, treatments, images }) {
  const result = await db.run(
    `INSERT INTO conditions (name, description, triggers, treatments, images)
     VALUES (?, ?, ?, ?, ?)`,
    [
      name,
      description,
      JSON.stringify(triggers),
      JSON.stringify(treatments),
      JSON.stringify(images),
    ]
  )

  return {
    id: result.lastID,
    name,
    description,
    triggers,
    treatments,
    images,
  }
}

export async function deleteCondition(db, id) {
  await db.run("DELETE FROM conditions WHERE id = ?", [id])
  return true
}
