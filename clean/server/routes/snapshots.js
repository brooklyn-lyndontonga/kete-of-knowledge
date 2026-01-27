import express from "express"
import { getDB } from "../db/index.js"

const router = express.Router()

// GET all snapshots (admin overview)
router.get("/", async (req, res) => {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM snapshots ORDER BY createdAt DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ snapshots error:", err)
    res.status(500).json({ error: "Failed to fetch snapshots" })
  }
})

export default router
