import * as Templates from "../../../shared/models/reflectionTemplatesModel.js"

export async function latest(req, res) {
  const db = req.app.get("db")
  res.json(await Templates.getLatest(db))
}

export async function index(req, res) {
  const db = req.app.get("db")
  res.json(await Templates.getAll(db))
}

export async function show(req, res) {
  const db = req.app.get("db")
  res.json(await Templates.get(db, req.params.id))
}

export async function create(req, res) {
  const db = req.app.get("db")
  res.status(201).json(await Templates.create(db, req.body))
}

export async function update(req, res) {
  const db = req.app.get("db")
  res.json(await Templates.update(db, req.params.id, req.body))
}

export async function remove(req, res) {
  const db = req.app.get("db")
  res.json(await Templates.remove(db, req.params.id))
}
