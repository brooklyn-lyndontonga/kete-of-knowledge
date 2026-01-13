// server/db/db.js

let dbInstance = null

/**
 * Called once during app boot (in app.js)
 */
export function setDB(db) {
  dbInstance = db
}

/**
 * Used everywhere else (models, controllers)
 */
export function getDB() {
  if (!dbInstance) {
    throw new Error("❌ Database has not been initialised")
  }

  return dbInstance
}
