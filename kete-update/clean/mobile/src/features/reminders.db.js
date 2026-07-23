import { getDB } from "../db"
import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"
import { scheduleDailyReminder, cancelReminder } from "./notifications"

export async function addReminder({
  title,
  schedule = "daily",
  timeOfDay = "",
  notes = "",
}) {
  const notificationId = timeOfDay
    ? await scheduleDailyReminder({ title, body: notes, timeOfDay })
    : null

  return insertRecord("reminders", {
    title,
    schedule,
    time_of_day: timeOfDay,
    notes,
    active: 1,
    notification_id: notificationId,
  })
}

export async function getReminders() {
  return listRecords("reminders", { orderBy: "active DESC, id DESC" })
}

export async function toggleReminder(id, active) {
  const db = await getDB()
  const row = await db.getFirstAsync(`SELECT * FROM reminders WHERE id = ?;`, [
    id,
  ])
  if (!row) return

  let notificationId = null

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
  }

  return updateRecord("reminders", id, {
    active: active ? 1 : 0,
    notification_id: notificationId,
  })
}

export async function deleteReminder(id) {
  const db = await getDB()
  const row = await db.getFirstAsync(
    `SELECT notification_id FROM reminders WHERE id = ?;`,
    [id]
  )
  await cancelReminder(row?.notification_id)
  return softDeleteRecord("reminders", id)
}
