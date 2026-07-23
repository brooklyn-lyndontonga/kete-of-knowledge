import { getDB } from "../db"

export async function addChecklist({ title, items = [] }) {
  const db = await getDB()
  const createdAt = new Date().toISOString()
  let checklistId = null

  await db.withTransactionAsync(async () => {
    const result = await db.runAsync(
      `INSERT INTO checklists (title, created_at) VALUES (?, ?);`,
      [title, createdAt]
    )
    checklistId = result.lastInsertRowId

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      await db.runAsync(
        `INSERT INTO checklist_items (checklist_id, label, done, sort_order)
         VALUES (?, ?, ?, ?);`,
        [checklistId, item.label, item.done ? 1 : 0, i]
      )
    }
  })

  return { id: checklistId, title, items, created_at: createdAt }
}

export async function getChecklists() {
  const db = await getDB()

  const lists = await db.getAllAsync(
    `SELECT * FROM checklists ORDER BY id DESC;`
  )
  const allItems = await db.getAllAsync(
    `SELECT * FROM checklist_items ORDER BY sort_order ASC, id ASC;`
  )

  return lists.map((list) => ({
    ...list,
    items: allItems.filter((i) => i.checklist_id === list.id),
  }))
}

export async function toggleChecklistItem(itemId, done) {
  const db = await getDB()
  await db.runAsync(`UPDATE checklist_items SET done = ? WHERE id = ?;`, [
    done ? 1 : 0,
    itemId,
  ])
}

export async function deleteChecklist(id) {
  const db = await getDB()
  await db.withTransactionAsync(async () => {
    await db.runAsync(`DELETE FROM checklist_items WHERE checklist_id = ?;`, [id])
    await db.runAsync(`DELETE FROM checklists WHERE id = ?;`, [id])
  })
}
