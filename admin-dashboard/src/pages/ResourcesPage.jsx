// admin-dashboard/src/pages/ResourcesPage.jsx
import React, { useEffect, useState } from "react"
import "./AdminTable.css"
import { resourcesAPI } from "../api/resources"
import { resourceCategoriesAPI } from "../api/resourceCategories"

export default function ResourcesPage() {
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)

  // Form fields
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState("")

  // -------------------------
  // FETCH DATA
  // -------------------------
  const loadData = async () => {
    try {
      setLoading(true)
      const [resList, catList] = await Promise.all([
        resourcesAPI.list(),
        resourceCategoriesAPI.list(),
      ])

      setResources(resList)
      setCategories(catList)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // -------------------------
  // OPEN ADD / EDIT MODAL
  // -------------------------
  const openAddModal = () => {
    setEditId(null)
    setTitle("")
    setContent("")
    setImageUrl("")
    setCategoryId("")
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setEditId(item.id)
    setTitle(item.title)
    setContent(item.content)
    setImageUrl(item.image_url || "")
    setCategoryId(item.category_id)
    setShowModal(true)
  }

  // -------------------------
  // SUBMIT FORM
  // -------------------------
  const saveResource = async () => {
    try {
      const data = {
        title,
        content,
        image_url: imageUrl,
        category_id: Number(categoryId),
      }

      if (editId) {
        await resourcesAPI.update(editId, data)
      } else {
        await resourcesAPI.create(data)
      }

      setShowModal(false)
      await loadData()
    } catch (err) {
      alert("Error saving resource: " + err.message)
    }
  }

  // -------------------------
  // DELETE
  // -------------------------
  const deleteResource = async (id) => {
    if (!window.confirm("Delete this resource?")) return

    try {
      await resourcesAPI.remove(id)
      await loadData()
    } catch (err) {
      alert("Error deleting resource: " + err.message)
    }
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="admin-page">
      <h1 className="page-title">Library Resources</h1>
      <p className="page-subtitle">
        Manage the educational content that appears inside the app.
      </p>

      <button className="add-btn" onClick={openAddModal}>
        + Add Resource
      </button>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Title</th>
            <th>Preview</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {resources.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {
                  categories.find((cat) => cat.id === item.category_id)
                    ?.name
                }
              </td>
              <td>{item.title}</td>

              <td>
                <div
                  style={{
                    maxWidth: "240px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.content}
                </div>
              </td>

              <td className="action-col">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteResource(item.id)}
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
          <div className="modal big-modal">
            <h2>{editId ? "Edit Resource" : "Add Resource"}</h2>

            {/* Category */}
            <label>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            {/* Title */}
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
            />

            {/* Content */}
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Resource body text"
              rows="6"
            />

            {/* Image */}
            <label>Image URL (optional)</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />

            {/* Actions */}
            <div className="modal-actions">
              <button className="save-btn" onClick={saveResource}>
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
