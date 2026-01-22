import {
  getGoals,
  addGoal,
  deleteGoal,
} from "../../../shared/models/goalsModel.js"

export async function listGoals(req, res) {
  try {
    const db = req.app.get("db")
    const goals = await getGoals(db)
    res.json(goals)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load goals" })
  }
}

export async function createGoal(req, res) {
  try {
    const db = req.app.get("db")
    const goal = await addGoal(db, req.body)
    res.status(201).json(goal)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add goal" })
  }
}

export async function removeGoal(req, res) {
  try {
    const db = req.app.get("db")
    await deleteGoal(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete goal" })
  }
}
