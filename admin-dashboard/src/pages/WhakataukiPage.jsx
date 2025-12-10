import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as whakataukiApi from "../api/whakatauki"

export default function WhakataukiPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      const data = await whakataukiApi.fetchWhakatauki()
      setRows(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => load(), [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await whakataukiApi.updateWhakatauki(editing.id, formData)
        showToast("Whakataukī updated")
      } else {
        await whakataukiApi.createWhakatauki(formData)
        showToast("Whakataukī created")
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
      await whakataukiApi.deleteWhakatauki(deleteId)
      showToast("Deleted")
      setDeleteId(null)
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <div className="page-container">
      <h1>Whakataukī</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Whakataukī
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "text", label: "Text" },
          { key: "translation", label: "Translation" },
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
          { name: "text", label: "Text", type: "textarea" },
          { name: "translation", label: "Translation", type: "textarea" },
          { name: "attribution", label: "Attribution" },
        ]}
        onSave={handleSave}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
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
