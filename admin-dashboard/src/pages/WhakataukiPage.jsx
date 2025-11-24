// admin-dashboard/src/pages/WhakataukiPage.jsx
import React, { useEffect, useState } from "react"
import "./AdminTable.css"
import { whakataukiAPI } from "../api/whakatauki"

export default function WhakataukiPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)

  // Form fields
  const [maori, setMaori] = useState("")
  const [english, setEnglish] = useState("")
  const [context, setContext] = useState("")

  // -------------------
  // LOAD DATA
  // -------------------
  const loadData = async () => {
    try {
      setLoading(true)
      const data = await whakataukiAPI.list()
      setList(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // -------------------
  // OPEN ADD
  // -------------------
  const openAdd = () => {
    setEditId(null)
    setMaori("")
    setEnglish("")
    setContext("")
    setShowModal(true)
  }

  // -------------------
  // OPEN EDIT
  // -------------------
  const openEdit = (item) => {
    setEditId(item.id)
    setMaori(item.maori)
    setEnglish(item.english)
    setContext(item.context)
    setShowModal(true)
  }

  // -------------------
  // SAVE ITEM
  // -------------------
  const saveItem = async () => {
    const payload = {
      maori,
      english,
      context,
    }

    try {
      if (editId) {
        await whakataukiAPI.update(editId, payload)
      } else {
        await whakataukiAPI.create(payload)
      }

      setShowModal(false)
      loadData()
    } catch (err) {
      alert("Error saving: " + err.message)
    }
  }

  // -------------------
  // DELETE
  // -------------------
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this whakataukī?")) return
    try {
      await whakataukiAPI.remove(id)
      loadData()
    } catch (err) {
      alert("Error deleting: " + err.message)
    }
  }

  // -------------------
  // UI
  // -------------------
  return (
    <div className="admin-page">
      <h1 className="page-title">Whakataukī</h1>
      <p className="page-subtitle">
        Manage all whakataukī displayed in the app.
      </p>

      <button className="add-btn" onClick={openAdd}>
        + Add Whakataukī
      </button>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Māori</th>
            <th>English</th>
            <th>Context</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="truncate">{item.maori}</td>
              <td className="truncate">{item.english}</td>
              <td className="truncate">{item.context}</td>

              <td className="action-col">
                <button className="edit-btn" onClick={() => openEdit(item)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.id)}
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
            <h2>{editId ? "Edit Whakataukī" : "Add Whakataukī"}</h2>

            <label>Māori</label>
            <textarea
              rows="2"
              value={maori}
              onChange={(e) => setMaori(e.target.value)}
              placeholder="Enter the whakataukī"
            />

            <label>English translation</label>
            <textarea
              rows="2"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Translate the whakataukī"
            />

            <label>Context (optional)</label>
            <textarea
              rows="3"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="When or why this whakataukī is used"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={saveItem}>
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
