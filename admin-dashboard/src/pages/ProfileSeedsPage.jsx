/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as seedsApi from "../api/profileSeeds"

export default function ProfileSeedsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // -----------------------------
  // LOAD DATA (React-safe version)
  // -----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const data = await seedsApi.fetchProfileSeeds()
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

  // -----------------------------
  // SAVE HANDLER
  // -----------------------------
  async function handleSave(formData) {
    try {
      if (editing) {
        await seedsApi.updateProfileSeed(editing.id, formData)
        showToast("Seed updated")
      } else {
        await seedsApi.createProfileSeed(formData)
        showToast("Seed created")
      }

      setEditing(null)
      setModalOpen(false)

      // reload
      const updated = await seedsApi.fetchProfileSeeds()
      setRows(updated)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // DELETE HANDLER
  // -----------------------------
  async function handleDelete() {
    try {
      await seedsApi.deleteProfileSeed(deleteId)
      showToast("Deleted")

      setDeleteId(null)

      const updated = await seedsApi.fetchProfileSeeds()
      setRows(updated)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  if (loading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  return (
    <div className="page-container">
      <h1>Profile Seeds</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Seed
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "value", label: "Value" },
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
          { name: "name", label: "Name" },
          { name: "value", label: "Value" },
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
