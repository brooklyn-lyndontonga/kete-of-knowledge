/* eslint-disable no-undef */
export async function getTodayChecklistCount(userId) {
  const db = getDB()

  const result = await db.get(
    `
    SELECT COUNT(*) as count
    FROM checklist_items
    WHERE user_id = ?
      AND completed = 0
      AND date = DATE('now')
    `,
    [userId]
  )

  return result.count
}
