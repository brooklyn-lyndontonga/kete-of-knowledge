/**
 * Single source of truth for what syncs between device and server.
 *
 * This file is deliberately dependency-free and is mirrored at
 * clean/server/db/syncManifest.js. If you change one, change both.
 *
 * Every synced row carries:
 *   uuid        - generated on the device, stable across devices, the real key
 *   updated_at  - ISO timestamp, drives last-write-wins conflict resolution
 *   deleted_at  - tombstone; a deleted row syncs rather than vanishing
 */

export const SYNC_TABLES = [
  {
    local: "profiles",
    remote: "user_profiles",
    columns: [
      "name",
      "dob",
      "photo_uri",
      "health_info",
      "health_providers",
      "emergency_contacts",
    ],
  },
  {
    local: "goals",
    remote: "user_goals",
    columns: ["title", "description", "active"],
  },
  {
    local: "symptoms",
    remote: "user_symptoms",
    columns: ["symptom", "severity", "notes", "tags", "logged_at"],
  },
  {
    local: "medicines",
    remote: "user_medicines",
    columns: ["name", "type", "dosage", "notes", "active"],
  },
  {
    local: "notes",
    remote: "user_notes",
    columns: ["title", "content"],
  },
  {
    local: "reminders",
    remote: "user_reminders",
    columns: ["title", "schedule", "time_of_day", "notes", "active"],
  },
  {
    local: "checklists",
    remote: "user_checklists",
    columns: ["title"],
  },
  {
    local: "checklist_items",
    remote: "user_checklist_items",
    // checklist_uuid links an item to its parent without depending on
    // autoincrement ids, which differ between device and server.
    columns: ["checklist_uuid", "label", "done", "sort_order"],
  },
  {
    local: "contacts",
    remote: "user_contacts",
    columns: [
      "name",
      "relationship",
      "phone",
      "email",
      "category",
      "is_emergency",
      "notes",
      "sort_order",
    ],
  },
]

export const SYNC_META_COLUMNS = ["uuid", "updated_at", "deleted_at"]

export function tableByLocal(name) {
  return SYNC_TABLES.find((t) => t.local === name) || null
}

export function tableByRemote(name) {
  return SYNC_TABLES.find((t) => t.remote === name) || null
}
