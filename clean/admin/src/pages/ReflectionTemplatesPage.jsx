/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchReflectionTemplates,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../api/content.api"

export default function ReflectionTemplatesPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const data = await fetchReflectionTemplates()
      setRows(data || [])
    } catch (err) {
      setError("Failed to load reflection templates")
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
        await updateReflectionTemplate(editing.id, formData)
      } else {
        await createReflectionTemplate(formData)
      }

      setEditing(null)
      setModalOpen(false)
      load()
    } catch (err) {
      alert("Failed to save reflection template")
    }
  }

  async function handleDelete() {
    try {
      await deleteReflectionTemplate(deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      alert("Failed to delete reflection template")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Reflection Templates</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Template
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        columns={[
          { key: "category", label: "Category" },
          { key: "title", label: "Title" },
          { key: "prompt", label: "Prompt" },
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
          { name: "category", label: "Category" },
          { name: "title", label: "Title" },
          {
            name: "prompt",
            label: "Prompt",
            type: "textarea",
          },
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
