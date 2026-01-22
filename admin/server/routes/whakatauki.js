import express from "express"
import { connectDB } from "../../../db/database.js"

const router = express.Router()

router.get("/", async (_, res) => {
  const db = await connectDB()
  const rows = await db.all("SELECT * FROM whakatauki")
  res.json(rows)
})

export default router
                                    