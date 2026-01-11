/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

import { useAdminToast } from "../components/AdminToastProvider"
import * as resourcesApi from "../api/resources"
import * as categoriesApi from "../api/resourceCategories"

export default function ResourcesPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // -----------------------------
  // LOAD DATA (React 18 safe)
  // -----------------------------
  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)

        const [res, cats] = await Promise.all([
          resourcesApi.fetchResources({ signal: controller.signal }),
          categoriesApi.fetchResourceCategories({ signal: controller.signal }),
        ])

        setRows(Array.isArray(res) ? res : [])
        setCategories(Array.isArray(cats) ? cats : [])
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    loadData()

    return () => {
      controller.abort()
    }
  }, [])

  // -----------------------------
  // SAVE RESOURCE
  // -----------------------------
  async function handleSave(formData) {
    try {
      if (editing) {
        await resourcesApi.updateResource(editing.id, formData)
        showToast("Resource updated")
      } else {
        await resourcesApi.createResource(formData)
        showToast("Resource created")
      }

      setModalOpen(false)
      setEditing(null)

      const refreshed = await resourcesApi.fetchResources()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // DELETE RESOURCE
  // -----------------------------
  async function handleDelete() {
    try {
      await resourcesApi.deleteResource(deleteId)
      showToast("Deleted")

      setDeleteId(null)

      const refreshed = await resourcesApi.fetchResources()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="page-container">
      <h1>Library Resources</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Resource
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          { key: "categoryId", label: "Category ID" },
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
          { name: "image", label: "Image Path (/images/...)" },
          {
            name: "categoryId",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({
              label: c.name,
              value: c.id,
            })),
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
    </div>
  )
}
