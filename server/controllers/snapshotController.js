import {
  getAllSnapshots,
  getLatestSnapshot,
  getSnapshotById,
  createSnapshot,
  updateSnapshot,
  deleteSnapshot
} from "../models/snapshotsModel.js";

export async function getSnapshots(req, res) {
  try {
    const items = await getAllSnapshots();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getSnapshot(req, res) {
  try {
    const item = await getSnapshotById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLatest(req, res) {
  try {
    const item = await getLatestSnapshot();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function postSnapshot(req, res) {
  try {
    const newItem = await createSnapshot(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function putSnapshot(req, res) {
  try {
    const updated = await updateSnapshot(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeSnapshot(req, res) {
  try {
    await deleteSnapshot(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
