import {
  getAllConditions,
  getConditionById,
  createCondition,
  updateCondition,
  deleteCondition
} from "../models/conditionsModel.js";

export async function getConditions(req, res) {
  try {
    const conditions = await getAllConditions();
    res.json(conditions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCondition(req, res) {
  try {
    const condition = await getConditionById(req.params.id);
    if (!condition) return res.status(404).json({ error: "Condition not found" });
    res.json(condition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function postCondition(req, res) {
  try {
    const newCondition = await createCondition(req.body);
    res.status(201).json(newCondition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function putCondition(req, res) {
  try {
    const updated = await updateCondition(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Condition not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeCondition(req, res) {
  try {
    await deleteCondition(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
