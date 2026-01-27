/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} from "../api/content.api"

export default function ConditionsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const data = await fetchConditions()
      setRows(data || [])
    } catch (err) {
      setError("Failed to load conditions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await updateCondition(editing.id, formData)
      } else {
        await createCondition(formData)
      }

      setEditing(null)
      setModalOpen(false)
      load()
    } catch (err) {
      alert("Failed to save condition")
    }
  }

  async function handleDelete() {
    try {
      await deleteCondition(deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      alert("Failed to delete condition")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Conditions</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Condition
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
        ]}
        onEdit={(row) => {
          setEditing(row)
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "title", label: "Title" },
          { name: "summary", label: "Summary", type: "textarea" },
        ]}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setModalOpen(false)
        }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  )
}
