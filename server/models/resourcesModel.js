import db from "../db/database.js";

export async function getAllResources() {
  return await db.all(`
    SELECT resources.*, resource_categories.name AS category_name
    FROM resources
    LEFT JOIN resource_categories ON resources.category_id = resource_categories.id
    ORDER BY resources.id DESC
  `);
}

export async function getResourceById(id) {
  return await db.get(`
    SELECT resources.*, resource_categories.name AS category_name
    FROM resources
    LEFT JOIN resource_categories ON resources.category_id = resource_categories.id
    WHERE resources.id = ?
  `, [id]);
}

export async function createResource(data) {
  const { title, content, category_id, image_url } = data;

  const result = await db.run(
    `INSERT INTO resources (title, content, category_id, image_url)
     VALUES (?, ?, ?, ?)`,
    [title, content, category_id, image_url]
  );

  return getResourceById(result.lastID);
}

export async function updateResource(id, data) {
  const existing = await getResourceById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...data,
  };

  await db.run(
    `UPDATE resources
     SET title = ?, content = ?, category_id = ?, image_url = ?
     WHERE id = ?`,
    [
      updated.title,
      updated.content,
      updated.category_id,
      updated.image_url,
      id
    ]
  );

  return getResourceById(id);
}

export async function deleteResource(id) {
  await db.run("DELETE FROM resources WHERE id = ?", [id]);
  return true;
}
