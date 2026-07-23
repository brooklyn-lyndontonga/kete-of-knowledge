export const schema = `
CREATE TABLE IF NOT EXISTS app_state (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS consent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  accepted INTEGER NOT NULL,
  version TEXT,
  accepted_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  dob TEXT,
  photo_uri TEXT,
  health_info TEXT,
  health_providers TEXT,
  emergency_contacts TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT,
  email TEXT,
  category TEXT DEFAULT 'whanau',
  is_emergency INTEGER DEFAULT 0,
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS symptoms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symptom TEXT NOT NULL,
  severity INTEGER,
  notes TEXT,
  tags TEXT,
  logged_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS medicines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT,
  dosage TEXT,
  notes TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  schedule TEXT,
  time_of_day TEXT,
  notes TEXT,
  active INTEGER DEFAULT 1,
  notification_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS checklists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS checklist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  checklist_id INTEGER NOT NULL,
  label TEXT NOT NULL,
  done INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  checklist_uuid TEXT,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1,
  FOREIGN KEY (checklist_id) REFERENCES checklists(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_checklist_items_list
  ON checklist_items (checklist_id);

CREATE INDEX IF NOT EXISTS idx_symptoms_logged_at
  ON symptoms (logged_at);

CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reflections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt TEXT,
  prompt_id TEXT,
  response TEXT NOT NULL,
  logged_at TEXT DEFAULT CURRENT_TIMESTAMP,
  uuid TEXT,
  updated_at TEXT,
  deleted_at TEXT,
  dirty INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sync_state (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
`

/**
 * Columns added after the first beta shipped.
 * Applied idempotently on every launch so existing installs upgrade cleanly.
 */
export const migrations = [
  { table: "profiles", column: "updated_at", type: "TEXT" },
  { table: "notes", column: "updated_at", type: "TEXT" },
  { table: "reminders", column: "time_of_day", type: "TEXT" },
  { table: "reminders", column: "notification_id", type: "TEXT" },
  { table: "reminders", column: "created_at", type: "TEXT" },
  { table: "medicines", column: "created_at", type: "TEXT" },
  { table: "consent", column: "version", type: "TEXT" },

  // Sync metadata
  { table: "profiles", column: "uuid", type: "TEXT" },
  { table: "profiles", column: "updated_at", type: "TEXT" },
  { table: "profiles", column: "deleted_at", type: "TEXT" },
  { table: "profiles", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "contacts", column: "uuid", type: "TEXT" },
  { table: "contacts", column: "updated_at", type: "TEXT" },
  { table: "contacts", column: "deleted_at", type: "TEXT" },
  { table: "contacts", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "symptoms", column: "uuid", type: "TEXT" },
  { table: "symptoms", column: "updated_at", type: "TEXT" },
  { table: "symptoms", column: "deleted_at", type: "TEXT" },
  { table: "symptoms", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "medicines", column: "uuid", type: "TEXT" },
  { table: "medicines", column: "updated_at", type: "TEXT" },
  { table: "medicines", column: "deleted_at", type: "TEXT" },
  { table: "medicines", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "notes", column: "uuid", type: "TEXT" },
  { table: "notes", column: "updated_at", type: "TEXT" },
  { table: "notes", column: "deleted_at", type: "TEXT" },
  { table: "notes", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "reminders", column: "uuid", type: "TEXT" },
  { table: "reminders", column: "updated_at", type: "TEXT" },
  { table: "reminders", column: "deleted_at", type: "TEXT" },
  { table: "reminders", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "checklists", column: "uuid", type: "TEXT" },
  { table: "checklists", column: "updated_at", type: "TEXT" },
  { table: "checklists", column: "deleted_at", type: "TEXT" },
  { table: "checklists", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "goals", column: "uuid", type: "TEXT" },
  { table: "goals", column: "updated_at", type: "TEXT" },
  { table: "goals", column: "deleted_at", type: "TEXT" },
  { table: "goals", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "checklist_items", column: "uuid", type: "TEXT" },
  { table: "checklist_items", column: "updated_at", type: "TEXT" },
  { table: "checklist_items", column: "deleted_at", type: "TEXT" },
  { table: "checklist_items", column: "dirty", type: "INTEGER DEFAULT 1" },
  { table: "checklist_items", column: "checklist_uuid", type: "TEXT" },
]
