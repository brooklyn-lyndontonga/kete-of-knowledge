import { useEffect, useState } from "react"
import CrudTable from "../../ui/CrudTable.jsx"
import CrudModal from "../../ui/CrudModal.jsx"
import DeleteConfirmModal from "../../ui/DeleteConfirmModal.jsx"
import { useAdminToast } from "../../components/AdminToastProvider"

import * as snapshotsApi from "./snapshots.api"

export default function SnapshotsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        const data = await snapshotsApi.fetchSnapshots({
          signal: controller.signal,
        })
        setRows(data || [])
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [showToast])

  async function handleSave(formData) {
    try {
      if (editing) {
        await snapshotsApi.updateSnapshot(editing.id, formData)
        showToast("Snapshot updated")
      } else {
        await snapshotsApi.createSnapshot(formData)
        showToast("Snapshot created")
      }

      setEditing(null)
      setModalOpen(false)
      setRows(await snapshotsApi.fetchSnapshots())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await snapshotsApi.deleteSnapshot(deleteId)
      showToast("Snapshot deleted")
      setDeleteId(null)
      setRows(await snapshotsApi.fetchSnapshots())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Progress Snapshots</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Snapshot
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "mood", label: "Mood" },
          { key: "energy", label: "Energy" },
          { key: "notes", label: "Notes" },
          { key: "createdAt", label: "Date" },
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
            name: "mood",
            label: "Mood",
            type: "select",
            options: [
              { label: "Great", value: "great" },
              { label: "Okay", value: "okay" },
              { label: "Low", value: "low" },
            ],
          },
          {
            name: "energy",
            label: "Energy",
            type: "select",
            options: [
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ],
          },
          { name: "notes", label: "Notes", type: "textarea" },
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
