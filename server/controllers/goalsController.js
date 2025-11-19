// server/controllers/goalsController.js
import { connectDB } from "../db/init.js"

// GET /goals
export async function listGoals(req, res) {
  try {
    const db = await connectDB()
    const goals = await db.all("SELECT * FROM goals")
    res.json(goals)
  } catch (err) {
    console.error("Error loading goals:", err)
    res.status(500).json({ error: "Failed to load goals" })
  }
}

// POST /goals
export async function createGoal(req, res) {
  try {
    const { title } = req.body
    if (!title) return res.status(400).json({ error: "Title required" })

    const db = await connectDB()

    const result = await db.run(
      "INSERT INTO goals (title, description) VALUES (?, ?)",
      [title, ""]
    )

    res.json({
      id: result.lastID,
      title,
      description: "",
    })
  } catch (err) {
    console.error("Error creating goal:", err)
    res.status(500).json({ error: "Failed to create goal" })
  }
}

// DELETE /goals/:id
export async function removeGoal(req, res) {
  try {
    const { id } = req.params

    const db = await connectDB()

    await db.run("DELETE FROM goals WHERE id = ?", id)

    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting goal:", err)
    res.status(500).json({ error: "Failed to delete goal" })
  }
}
