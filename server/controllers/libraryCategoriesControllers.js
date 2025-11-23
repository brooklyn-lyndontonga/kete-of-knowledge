import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../models/libraryCategoriesModel.js"

export async function getCategories(req, res) {
  const db = req.app.get("db")
  res.json(await getAllCategories(db))
}

export async function addCategory(req, res) {
  const db = req.app.get("db")
  await createCategory(db, req.body)
  res.json({ success: true })
}

export async function removeCategory(req, res) {
  const db = req.app.get("db")
  await deleteCategory(db, req.params.id)
  res.json({ success: true })
}
