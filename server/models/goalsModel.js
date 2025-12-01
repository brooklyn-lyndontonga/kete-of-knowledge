export async function getGoals(db) {
  return db.all("SELECT * FROM goals");
}

export async function addGoal(db, title, description = "") {
  const result = await db.run(
    "INSERT INTO goals (title, description) VALUES (?, ?)",
    [title, description]
  );
  return { id: result.lastID, title, description };
}

export async function deleteGoal(db, id) {
  await db.run("DELETE FROM goals WHERE id = ?", [id]);
  return true;
}
