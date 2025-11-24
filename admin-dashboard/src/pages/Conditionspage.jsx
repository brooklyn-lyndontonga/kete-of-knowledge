// admin-dashboard/src/pages/ConditionsPage.jsx
import React, { useEffect, useState } from "react"
import "./AdminTable.css"
import { conditionsAPI } from "../api/conditions"

export default function ConditionsPage() {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)

  // Form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [treatments, setTreatments] = useState("")

  // -------------------------
  // LOAD CONDITIONS
  // -------------------------
  const loadConditions = async () => {
    try {
      setLoading(true)
      const data = await conditionsAPI.list()
      setConditions(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConditions()
  }, [])

  // -------------------------
  // OPEN MODAL (ADD)
  // -------------------------
  const openAddModal = () => {
    setEditId(null)
    setName("")
    setDescription("")
    setSymptoms("")
    setTreatments("")
    setShowModal(true)
  }

  // -------------------------
  // OPEN MODAL (EDIT)
  // -------------------------
  const openEditModal = (condition) => {
    setEditId(condition.id)
    setName(condition.name)
    setDescription(condition.description)
    setSymptoms(condition.symptoms)
    setTreatments(condition.treatments)
    setShowModal(true)
  }

  // -------------------------
  // SAVE CHANGES
  // -------------------------
  const saveCondition = async () => {
    const payload = {
      name,
      description,
      symptoms,
      treatments,
    }

    try {
      if (editId) {
        await conditionsAPI.update(editId, payload)
      } else {
        await conditionsAPI.create(payload)
      }

      setShowModal(false)
      await loadConditions()
    } catch (err) {
      alert("Error saving condition: " + err.message)
    }
  }

  // -------------------------
  // DELETE
  // -------------------------
  const deleteCondition = async (id) => {
    if (!window.confirm("Delete this condition?")) return

    try {
      await conditionsAPI.remove(id)
      await loadConditions()
    } catch (err) {
      alert("Error deleting condition: " + err.message)
    }
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="admin-page">
      <h1 className="page-title">Health Conditions</h1>
      <p className="page-subtitle">
        Manage health conditions shown in the Library and Hub.
      </p>

      <button className="add-btn" onClick={openAddModal}>
        + Add Condition
      </button>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symptoms Preview</th>
            <th>Treatments Preview</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {conditions.map((cond) => (
            <tr key={cond.id}>
              <td>{cond.id}</td>
              <td>{cond.name}</td>

              <td className="truncate">
                {cond.symptoms?.slice(0, 80)}
                {cond.symptoms?.length > 80 && "..."}
              </td>

              <td className="truncate">
                {cond.treatments?.slice(0, 80)}
                {cond.treatments?.length > 80 && "..."}
              </td>

              <td className="action-col">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(cond)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteCondition(cond.id)}
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
            <h2>{editId ? "Edit Condition" : "Add Condition"}</h2>

            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Condition name"
            />

            <label>Description</label>
            <textarea
              value={description}
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this condition?"
            />

            <label>Symptoms</label>
            <textarea
              value={symptoms}
              rows="4"
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Comma-separated list or paragraph"
            />

            <label>Treatments</label>
            <textarea
              value={treatments}
              rows="4"
              onChange={(e) => setTreatments(e.target.value)}
              placeholder="Guidance, support, management advice"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={saveCondition}>
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
