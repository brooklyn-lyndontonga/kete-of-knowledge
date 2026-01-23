// shared/models/whakataukiModel.js

/**
 * Get all whakataukī
 * @param {import("sqlite").Database} db
 */
export async function getAllWhakatauki(db) {
  if (!db) {
    throw new Error("DB missing in getAllWhakatauki")
  }

  return db.all(`
    SELECT *
    FROM whakatauki
    ORDER BY id DESC
  `)
}

/**
 * Get daily whakataukī
 * @param {import("sqlite").Database} db
 */
export async function getDailyWhakatauki(db) {
  if (!db) {
    throw new Error("DB missing in getDailyWhakatauki")
  }

  return db.get(`
    SELECT *
    FROM whakatauki
    ORDER BY RANDOM()
    LIMIT 1
  `)
}
