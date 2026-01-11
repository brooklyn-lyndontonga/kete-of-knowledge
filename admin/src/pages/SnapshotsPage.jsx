/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as snapshotsApi from "../api/snapshots"

export default function SnapshotsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // -----------------------------
  // LOAD DATA (React 18 SAFE)
  // -----------------------------
  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)
        const data = await snapshotsApi.fetchSnapshots({
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

    return () => {
      controller.abort()
    }
  }, [])

  // -----------------------------
  // SAVE (CREATE / UPDATE)
  // -----------------------------
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

      const refreshed = await snapshotsApi.fetchSnapshots()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  async function handleDelete() {
    try {
      await snapshotsApi.deleteSnapshot(deleteId)
      showToast("Snapshot deleted")
      setDeleteId(null)

      const refreshed = await snapshotsApi.fetchSnapshots()
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
      <h1>Progress Snapshots</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Snapshot
      </button>

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
          {
            name: "notes",
            label: "Notes",
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
    </div>
  )
}
