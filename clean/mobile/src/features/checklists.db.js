import { getDB } from "../db"
import { insertRecord, softDeleteRecord, updateRecord } from "../db/records"

export async function addChecklist({ title, items = [] }) {
  const list = await insertRecord("checklists", { title })

  for (let i = 0; i < items.length; i++) {
    await insertRecord("checklist_items", {
      checklist_id: list.id,
      checklist_uuid: list.uuid,
      label: items[i].label,
      done: items[i].done ? 1 : 0,
      sort_order: i,
    })
  }

  return { ...list, items }
}

export async function getChecklists() {
  const db = await getDB()

  const lists = await db.getAllAsync(
    `SELECT * FROM checklists WHERE deleted_at IS NULL ORDER BY id DESC;`
  )
  const allItems = await db.getAllAsync(
    `SELECT * FROM checklist_items WHERE deleted_at IS NULL
     ORDER BY sort_order ASC, id ASC;`
  )

  return lists.map((list) => ({
    ...list,
    items: allItems.filter(
      (i) => i.checklist_id === list.id || i.checklist_uuid === list.uuid
    ),
  }))
}

export async function addChecklistItem(checklist, label) {
  return insertRecord("checklist_items", {
    checklist_id: checklist.id,
    checklist_uuid: checklist.uuid,
    label,
    done: 0,
    sort_order: 0,
  })
}

export async function toggleChecklistItem(itemId, done) {
  return updateRecord("checklist_items", itemId, { done: done ? 1 : 0 })
}

export async function deleteChecklist(id) {
  const db = await getDB()
  const items = await db.getAllAsync(
    `SELECT id FROM checklist_items WHERE checklist_id = ? AND deleted_at IS NULL;`,
    [id]
  )
  for (const item of items) {
    await softDeleteRecord("checklist_items", item.id)
  }
  return softDeleteRecord("checklists", id)
}
