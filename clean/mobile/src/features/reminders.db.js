import { getDB } from "../db"
import { scheduleDailyReminder, cancelReminder } from "./notifications"

export async function addReminder({
  title,
  schedule = "daily",
  timeOfDay = "",
  notes = "",
}) {
  const db = await getDB()
  const createdAt = new Date().toISOString()

  const notificationId = timeOfDay
    ? await scheduleDailyReminder({ title, body: notes, timeOfDay })
    : null

  const result = await db.runAsync(
    `INSERT INTO reminders (title, schedule, time_of_day, notes, active, notification_id, created_at)
     VALUES (?, ?, ?, ?, 1, ?, ?);`,
    [title, schedule, timeOfDay, notes, notificationId, createdAt]
  )

  return {
    id: result.lastInsertRowId,
    title,
    schedule,
    time_of_day: timeOfDay,
    notes,
    active: 1,
    notification_id: notificationId,
  }
}

export async function getReminders() {
  const db = await getDB()
  return db.getAllAsync(
    `SELECT * FROM reminders ORDER BY active DESC, id DESC;`
  )
}

export async function toggleReminder(id, active) {
  const db = await getDB()
  const row = await db.getFirstAsync(`SELECT * FROM reminders WHERE id = ?;`, [id])
  if (!row) return

  let notificationId = row.notification_id

  if (active) {
    notificationId = row.time_of_day
      ? await scheduleDailyReminder({
          title: row.title,
          body: row.notes,
          timeOfDay: row.time_of_day,
        })
      : null
  } else {
    await cancelReminder(row.notification_id)
    notificationId = null
  }

  await db.runAsync(
    `UPDATE reminders SET active = ?, notification_id = ? WHERE id = ?;`,
    [active ? 1 : 0, notificationId, id]
  )
}

export async function deleteReminder(id) {
  const db = await getDB()
  const row = await db.getFirstAsync(
    `SELECT notification_id FROM reminders WHERE id = ?;`,
    [id]
  )
  await cancelReminder(row?.notification_id)
  await db.runAsync(`DELETE FROM reminders WHERE id = ?;`, [id])
}
