// server/controllers/conditionsController.js

import {
  getAllConditions,
  getConditionById
} from "../models/conditionsModel.js"

export function listConditions(req, res) {
  res.json(getAllConditions())
}

export function getSingleCondition(req, res) {
  const condition = getConditionById(req.params.id)

  if (!condition) {
    return res.status(404).json({ error: "Condition not found" })
  }

  res.json(condition)
}
