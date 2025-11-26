import {
  getAllWhakatauki,
  getWhakataukiById,
  getRandomWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki
} from "../models/whakataukiModel.js";

export async function getWhakataukiList(req, res) {
  try {
    const items = await getAllWhakatauki();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getWhakataukiItem(req, res) {
  try {
    const item = await getWhakataukiById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getWhakataukiRandom(req, res) {
  try {
    const item = await getRandomWhakatauki();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function postWhakatauki(req, res) {
  try {
    const newItem = await createWhakatauki(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function putWhakatauki(req, res) {
  try {
    const updated = await updateWhakatauki(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeWhakatauki(req, res) {
  try {
    await deleteWhakatauki(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
