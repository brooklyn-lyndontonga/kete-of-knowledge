import { Router } from "express"
import { getPrisma } from "../db/prisma.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const prisma = getPrisma()
    const logs = await prisma.audit_logs.findMany({
      orderBy: { createdAt: "desc" },
      take: 100, // Return the 100 most recent logs
    })
    res.json(logs)
  } catch (err) {
    console.error("❌ GET /api/admin/audit-logs error:", err)
    res.status(500).json({ error: err.message })
  }
})

export default router
