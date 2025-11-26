import {
  getAllReflections,
  getLatestReflection,
  getReflectionById,
  createReflection,
  updateReflection,
  deleteReflection
} from "../models/reflectionsModel.js";

export async function getReflections(req, res) {
  try {
    const items = await getAllReflections();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getReflection(req, res) {
  try {
    const item = await getReflectionById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLatest(req, res) {
  try {
    const item = await getLatestReflection();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function postReflection(req, res) {
  try {
    const newItem = await createReflection(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function putReflection(req, res) {
  try {
    const updated = await updateReflection(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeReflection(req, res) {
  try {
    await deleteReflection(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
