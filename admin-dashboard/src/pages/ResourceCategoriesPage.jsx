// admin-dashboard/src/pages/ResourceCategoriesPage.jsx
import React, { useEffect, useState } from "react"
import "./AdminTable.css"
import { resourceCategoriesAPI } from "../api/resourceCategories"

export default function ResourceCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)

  // Form Fields
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("")

  // -------------------------
  // FETCH DATA
  // -------------------------
  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await resourceCategoriesAPI.list()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // -------------------------
  // OPEN MODAL (Add / Edit)
  // -------------------------
  const openAddModal = () => {
    setEditId(null)
    setName("")
    setIcon("")
    setShowModal(true)
  }

  const openEditModal = (category) => {
    setEditId(category.id)
    setName(category.name)
    setIcon(category.icon)
    setShowModal(true)
  }

  // -------------------------
  // SUBMIT FORM
  // -------------------------
  const submitForm = async () => {
    try {
      if (editId) {
        await resourceCategoriesAPI.update(editId, { name, icon })
      } else {
        await resourceCategoriesAPI.create({ name, icon })
      }

      setShowModal(false)
      await loadCategories()
    } catch (err) {
      alert("Error saving category: " + err.message)
    }
  }

  // -------------------------
  // DELETE
  // -------------------------
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return

    try {
      await resourceCategoriesAPI.remove(id)
      await loadCategories()
    } catch (err) {
      alert("Error deleting category: " + err.message)
    }
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="admin-page">
      <h1 className="page-title">Resource Categories</h1>
      <p className="page-subtitle">
        Manage the categories used in the app’s Library section.
      </p>

      <button className="add-btn" onClick={openAddModal}>
        + Add Category
      </button>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Icon</th>
            <th>Name</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.icon || "—"}</td>
              <td>{cat.name}</td>

              <td className="action-col">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(cat)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteCategory(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editId ? "Edit Category" : "Add Category"}</h2>

            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Heart Health"
            />

            <label>Icon (Emoji)</label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="❤️"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={submitForm}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
