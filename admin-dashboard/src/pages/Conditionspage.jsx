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

  // ----------------------------
  // LOAD DATA (React-safe async)
  // ----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const data = await conditionsApi.fetchConditions()
        setRows(data || [])
      } catch (err) {
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // -----------------------------------
  // NORMALISE FORM DATA BEFORE SENDING
  // -----------------------------------
  function normalize(formData) {
    return {
      ...formData,
      triggers: formData.triggers
        ? formData.triggers.split(",").map((s) => s.trim())
        : [],
      treatments: formData.treatments
        ? formData.treatments.split(",").map((s) => s.trim())
        : [],
      images: formData.images
        ? formData.images.split(",").map((s) => s.trim())
        : [],
    }
  }

  // ----------------------------
  // CREATE / UPDATE SAVE HANDLER
  // ----------------------------
  async function handleSave(formData) {
    try {
      const cleaned = normalize(formData)

      if (editing) {
        await conditionsApi.updateCondition(editing.id, cleaned)
        showToast("Condition updated")
      } else {
        await conditionsApi.createCondition(cleaned)
        showToast("Condition created")
      }

      setModalOpen(false)
      setEditing(null)
      // reload
      const refreshed = await conditionsApi.fetchConditions()
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
      await conditionsApi.deleteCondition(deleteId)
      showToast("Condition deleted")

      setDeleteId(null)

      const refreshed = await conditionsApi.fetchConditions()
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
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
        ]}
        onEdit={(row) => {
          setEditing({
            ...row,
            triggers: row.triggers?.join(", ") || "",
            treatments: row.treatments?.join(", ") || "",
            images: row.images?.join(", ") || "",
          })
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
          { name: "image", label: "Image Path" },
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
