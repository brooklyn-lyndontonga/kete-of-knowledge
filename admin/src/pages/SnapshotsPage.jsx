/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as templatesApi from "../api/reflections"

export default function ReflectionTemplatesPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // ----------------------------
  // LOAD DATA SAFELY
  // ----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const data = await templatesApi.fetchReflectionTemplates()
        setRows(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // ----------------------------
  // SAVE HANDLER
  // ----------------------------
  async function handleSave(formData) {
    try {
      if (editing) {
        await templatesApi.updateReflectionTemplate(editing.id, formData)
        showToast("Template updated")
      } else {
        await templatesApi.createReflectionTemplate(formData)
        showToast("Template created")
      }

      setModalOpen(false)
      setEditing(null)

      const refreshed = await templatesApi.fetchReflectionTemplates()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // ----------------------------
  // DELETE HANDLER
  // ----------------------------
  async function handleDelete() {
    try {
      await templatesApi.deleteReflectionTemplate(deleteId)
      showToast("Deleted")
      setDeleteId(null)

      const refreshed = await templatesApi.fetchReflectionTemplates()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <div className="page-container">
      <h1>Reflection Templates</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Template
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "category", label: "Category" },
          { key: "title", label: "Title" },
          { key: "prompt", label: "Prompt" }
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
          {
            name: "category",
            label: "Category",
            type: "select",
            options: [
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" }
            ]
          },
          { name: "title", label: "Title" },
          { name: "prompt", label: "Prompt", type: "textarea" }
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
    </div>
  )
}
