let dbInstance = null

export function setDB(db) {
  dbInstance = db
}

export function getDB() {
  if (!dbInstance) {
    throw new Error("DB not initialised")
  }
  return dbInstance
}
