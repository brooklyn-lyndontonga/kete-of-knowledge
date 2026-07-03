import { getDB } from "../db"

// Uses the modern expo-sqlite (SDK 51+) API.
//
// New in this version: checklist ITEMS are now persisted too, in the new
// checklist_items table (see src/db/schema.js). Previously items were
// collected in the Add screen and thrown away.

// -------------------------
// Add checklist (with items)
// -------------------------
export async function addChecklist({ title, items = [] }) {
  const db = getDB()

  const result = await db.runAsync(
    `INSERT INTO checklists (title) VALUES (?)`,
    [title]
  )

  const checklistId = result.lastInsertRowId

  for (const item of items) {
    await db.runAsync(
      `INSERT INTO checklist_items (checklist_id, label, done)
       VALUES (?, ?, ?)`,
      [checklistId, item.label, item.done ? 1 : 0]
    )
  }

  return { id: checklistId }
}

// -------------------------
// Get checklists (items included)
// -------------------------
export async function getChecklists() {
  const db = getDB()

  const lists = await db.getAllAsync(
    `SELECT * FROM checklists ORDER BY id DESC`
  )

  if (!lists.length) return []

  const items = await db.getAllAsync(
    `SELECT * FROM checklist_items ORDER BY id ASC`
  )

  const byChecklist = new Map()
  for (const item of items) {
    if (!byChecklist.has(item.checklist_id)) byChecklist.set(item.checklist_id, [])
    byChecklist.get(item.checklist_id).push(item)
  }

  return lists.map((list) => ({
    ...list,
    items: byChecklist.get(list.id) || [],
  }))
}

// -------------------------
// Toggle a checklist item
// -------------------------
export async function toggleChecklistItem(itemId, done) {
  const db = getDB()

  await db.runAsync(
    `UPDATE checklist_items SET done = ? WHERE id = ?`,
    [done ? 1 : 0, itemId]
  )
}

// -------------------------
// Delete a checklist (items cascade)
// -------------------------
export async function deleteChecklist(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM checklist_items WHERE checklist_id = ?`, [id])
  await db.runAsync(`DELETE FROM checklists WHERE id = ?`, [id])
}
