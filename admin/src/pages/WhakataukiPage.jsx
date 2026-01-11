/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as conditionsApi from "../api/conditions"

export default function ConditionsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
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
        const data = await conditionsApi.fetchConditions({
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
  // NORMALIZATION HELPERS
  // -----------------------------
  function stringToArray(str) {
    if (!str) return []
    return str.split(",").map((s) => s.trim()).filter(Boolean)
  }

  function arrayToString(arr) {
    return Array.isArray(arr) ? arr.join(", ") : ""
  }

  function normalizeForm(formData) {
    return {
      ...formData,
      triggers: stringToArray(formData.triggers),
      treatments: stringToArray(formData.treatments),
      images: stringToArray(formData.images),
    }
  }

  // -----------------------------
  // SAVE HANDLER
  // -----------------------------
  async function handleSave(formData) {
    try {
      const cleaned = normalizeForm(formData)

      if (editing) {
        await conditionsApi.updateCondition(editing.id, cleaned)
        showToast("Condition updated")
      } else {
        await conditionsApi.createCondition(cleaned)
        showToast("Condition created")
      }

      setEditing(null)
      setModalOpen(false)

      const refreshed = await conditionsApi.fetchConditions()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // DELETE HANDLER
  // -----------------------------
  async function handleDelete() {
    try {
      await conditionsApi.deleteCondition(deleteId)
      showToast("Deleted")
      setDeleteId(null)

      const refreshed = await conditionsApi.fetchConditions()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // RENDER PAGE
  // -----------------------------
  if (loading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  return (
    <div className="page-container">
      <h1>Conditions</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Condition
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
        ]}
        onEdit={(row) => {
          setEditing({
            ...row,
            triggers: arrayToString(row.triggers),
            treatments: arrayToString(row.treatments),
            images: arrayToString(row.images),
          })
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "name", label: "Name" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "triggers", label: "Triggers (comma-separated)" },
          { name: "treatments", label: "Treatments (comma-separated)" },
          { name: "images", label: "Images (comma-separated)" },
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
