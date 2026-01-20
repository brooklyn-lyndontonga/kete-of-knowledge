import { useEffect, useState } from "react"
import CrudTable from "../../ui/CrudTable.jsx"
import CrudModal from "../../ui/CrudModal.jsx"
import DeleteConfirmModal from "../../ui/DeleteConfirmModal.jsx"
import { useAdminToast } from "../../components/AdminToastProvider"


import * as seedsApi from "./profileSeeds.api"

export default function ProfileSeedsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)
        const data = await seedsApi.fetchProfileSeeds({
          signal: controller.signal,
        })
        setRows(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    loadData()
    return () => controller.abort()
  }, [showToast])

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

      const updated = await seedsApi.fetchProfileSeeds()
      setRows(updated)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await seedsApi.deleteProfileSeed(deleteId)
      showToast("Seed deleted")
      setDeleteId(null)

      const updated = await seedsApi.fetchProfileSeeds()
      setRows(updated)
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
