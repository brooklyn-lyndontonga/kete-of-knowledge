import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} from "../models/resourcesModel.js";

export async function getResources(req, res) {
  try {
    const resources = await getAllResources();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getResource(req, res) {
  try {
    const resource = await getResourceById(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function postResource(req, res) {
  try {
    const newResource = await createResource(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function putResource(req, res) {
  try {
    const updated = await updateResource(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Resource not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeResource(req, res) {
  try {
    await deleteResource(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
