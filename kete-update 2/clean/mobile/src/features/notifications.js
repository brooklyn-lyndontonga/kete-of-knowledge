/**
 * Thin wrapper around expo-notifications.
 *
 * The module is loaded lazily so the app still runs (reminders simply
 * won't alert) if the native module isn't in the current build. Run
 * `npx expo install expo-notifications` and rebuild to enable alerts.
 */

let Notifications = null
let loadAttempted = false

async function load() {
  if (loadAttempted) return Notifications
  loadAttempted = true
  try {
    Notifications = await import("expo-notifications")
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
  } catch {
    console.warn("expo-notifications unavailable - reminders will not alert.")
    Notifications = null
  }
  return Notifications
}

export async function isAvailable() {
  return Boolean(await load())
}

export async function requestPermission() {
  const N = await load()
  if (!N) return false

  const { status: existing } = await N.getPermissionsAsync()
  if (existing === "granted") return true

  const { status } = await N.requestPermissionsAsync()
  return status === "granted"
}

/**
 * Schedules a daily repeating notification.
 * timeOfDay is "HH:MM" in 24-hour form.
 * Returns the notification id to store against the reminder, or null.
 */
export async function scheduleDailyReminder({ title, body = "", timeOfDay }) {
  const N = await load()
  if (!N) return null

  const granted = await requestPermission()
  if (!granted) return null

  const [hourRaw, minuteRaw] = String(timeOfDay || "").split(":")
  const hour = Number(hourRaw)
  const minute = Number(minuteRaw)
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null

  return N.scheduleNotificationAsync({
    content: { title, body },
    trigger: { hour, minute, repeats: true },
  })
}

export async function cancelReminder(notificationId) {
  const N = await load()
  if (!N || !notificationId) return
  try {
    await N.cancelScheduledNotificationAsync(notificationId)
  } catch (err) {
    console.warn("Could not cancel notification:", err?.message)
  }
}
