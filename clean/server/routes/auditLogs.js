import { Router } from "express"
import { getDB } from "../db/index.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const db = await getDB()
    const logs = await db.all(
      `SELECT id, action, tableName, recordId, details, performedBy, createdAt
       FROM audit_logs
       ORDER BY id DESC
       LIMIT 100`
    )
    res.json(logs || [])
  } catch (err) {
    console.error("❌ GET /api/admin/audit-logs error:", err)
    res.status(500).json({ error: err.message })
  }
})

export default router
