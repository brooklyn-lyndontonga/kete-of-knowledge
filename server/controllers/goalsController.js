// server/controllers/goalsController.js
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../models/goalsModel.js"

export async function getAllGoals(req, res) {
  try {
    const goals = await getGoals(req.db)
    res.json(goals)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function addGoal(req, res) {
  try {
    const { title, description } = req.body
    await createGoal(req.db, { title, description })
    res.status(201).json({ message: "Goal added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function editGoal(req, res) {
  try {
    const { id } = req.params
    await updateGoal(req.db, id, req.body)
    res.json({ message: "Goal updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeGoal(req, res) {
  try {
    const { id } = req.params
    await deleteGoal(req.db, id)
    res.json({ message: "Goal deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
