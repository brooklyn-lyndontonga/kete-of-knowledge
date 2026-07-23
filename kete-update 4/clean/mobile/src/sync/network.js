/**
 * Thin wrapper around @react-native-community/netinfo.
 *
 * Loaded lazily so the app still runs if the native module isn't in the
 * current build — sync then falls back to foreground-only triggers.
 * Run `npx expo install @react-native-community/netinfo` and rebuild to
 * enable true sync-on-reconnect.
 */

let NetInfo = null
let loadAttempted = false

async function load() {
  if (loadAttempted) return NetInfo
  loadAttempted = true
  try {
    const mod = await import("@react-native-community/netinfo")
    NetInfo = mod.default || mod
  } catch {
    console.warn("netinfo unavailable - sync will run on app foreground only.")
    NetInfo = null
  }
  return NetInfo
}

export async function isAvailable() {
  return Boolean(await load())
}

export async function isOnline() {
  const N = await load()
  if (!N) return true // assume online; the fetch itself will fail if not

  try {
    const state = await N.fetch()
    return Boolean(state.isConnected && state.isInternetReachable !== false)
  } catch {
    return true
  }
}

/**
 * Calls onReconnect when the device transitions from offline to online.
 * Returns an unsubscribe function.
 */
export function subscribeToReconnect(onReconnect) {
  let unsubscribe = () => {}
  let wasOffline = false
  let cancelled = false

  load().then((N) => {
    if (!N || cancelled) return

    unsubscribe = N.addEventListener((state) => {
      const online = Boolean(
        state.isConnected && state.isInternetReachable !== false
      )

      if (online && wasOffline) {
        wasOffline = false
        onReconnect()
      } else if (!online) {
        wasOffline = true
      }
    })
  })

  return () => {
    cancelled = true
    unsubscribe()
  }
}
