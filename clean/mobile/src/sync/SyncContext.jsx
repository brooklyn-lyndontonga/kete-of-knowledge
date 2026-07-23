import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { AppState } from "react-native"

import { useAuth } from "../auth/AuthContext"
import { subscribeToReconnect } from "./network"
import {
  countPendingChanges,
  deleteRemoteData,
  getLastSyncedAt,
  syncNow,
} from "./engine"

const SyncContext = createContext(null)

// Don't hammer the server if the app is being switched in and out.
const MIN_INTERVAL_MS = 30 * 1000

export function SyncProvider({ children }) {
  const { session, isAuthenticated } = useAuth()
  const token = session?.token

  const [status, setStatus] = useState("idle") // idle | syncing | ok | offline | error
  const [lastSyncedAt, setLastSyncedAt] = useState(null)
  const [pending, setPending] = useState(0)
  const lastRunRef = useRef(0)

  const refreshMeta = useCallback(async () => {
    setLastSyncedAt(await getLastSyncedAt())
    setPending(await countPendingChanges())
  }, [])

  const run = useCallback(
    async ({ force = false } = {}) => {
      if (!token) return { ok: false, reason: "not-signed-in" }

      const elapsed = Date.now() - lastRunRef.current
      if (!force && elapsed < MIN_INTERVAL_MS) {
        return { ok: false, reason: "throttled" }
      }

      lastRunRef.current = Date.now()
      setStatus("syncing")

      const result = await syncNow(token)

      if (result.ok) setStatus("ok")
      else if (result.reason === "offline") setStatus("offline")
      else if (result.reason === "not-signed-in") setStatus("idle")
      else setStatus("error")

      await refreshMeta()
      return result
    },
    [token, refreshMeta]
  )

  // Sync once when a session appears.
  useEffect(() => {
    if (isAuthenticated) run({ force: true })
    else setStatus("idle")
    refreshMeta()
  }, [isAuthenticated, run, refreshMeta])

  // Sync the moment the device regains a connection. This is the
  // "sync on reconnect" behaviour named in the project scope.
  useEffect(() => {
    if (!isAuthenticated) return undefined
    return subscribeToReconnect(() => run({ force: true }))
  }, [isAuthenticated, run])

  // Sync when the app comes back to the foreground.
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && isAuthenticated) run()
    })
    return () => sub.remove()
  }, [isAuthenticated, run])

  const value = useMemo(
    () => ({
      status,
      lastSyncedAt,
      pending,
      sync: run,
      refreshMeta,
      deleteRemote: () => deleteRemoteData(token),
      isSignedIn: Boolean(token),
    }),
    [status, lastSyncedAt, pending, run, refreshMeta, token]
  )

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>
}

export function useSync() {
  const ctx = useContext(SyncContext)
  if (!ctx) throw new Error("useSync must be used within SyncProvider")
  return ctx
}
