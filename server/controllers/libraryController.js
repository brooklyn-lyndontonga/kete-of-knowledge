import * as Library from "../models/libraryModel.js"

export async function index(req, res) {
  const data = await Library.getAllResources()
  res.json(data)
}

export async function show(req, res) {
  const item = await Library.getResourceById(req.params.id)
  item ? res.json(item) : res.status(404).json({ error: "Not found" })
}

export async function create(req, res) {
  const item = await Library.createResource(req.body)
  res.status(201).json(item)
}

export async function update(req, res) {
  const updated = await Library.updateResource(req.params.id, req.body)
  res.json(updated)
}

export async function remove(req, res) {
  await Library.deleteResource(req.params.id)
  res.json({ success: true })
}
