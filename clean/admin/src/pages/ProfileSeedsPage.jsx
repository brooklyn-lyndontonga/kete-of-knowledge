import { useEffect, useState } from "react"

import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchProfileSeeds,
  createProfileSeed,
  updateProfileSeed,
  deleteProfileSeed,
} from "../api/content.api"

function showToast(message, type = "info") {
  console.log(`[${type}]`, message)
}

export default function ProfileSeedsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      setRows(await fetchProfileSeeds())
    } catch (err) {
      setError(err.message)
      showToast(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(formData) {
    try {
      if (editing) {
        await updateProfileSeed(editing.id, formData)
        showToast("Seed updated")
      } else {
        await createProfileSeed(formData)
        showToast("Seed created")
      }
      setEditing(null)
      setModalOpen(false)
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await deleteProfileSeed(deleteId)
      setDeleteId(null)
      showToast("Seed deleted")
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Profile Seeds</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Seed
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

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
    </>
  )
}
