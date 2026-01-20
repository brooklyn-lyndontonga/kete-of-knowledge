/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import CrudTable from "../../ui/CrudTable.jsx"
import CrudModal from "../../ui/CrudModal.jsx"
import DeleteConfirmModal from "../../ui/DeleteConfirmModal.jsx"
import { useAdminToast } from "../../components/AdminToastProvider"

import * as whakataukiApi from "./whakatauki.api"

export default function WhakataukiPage() {
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
        const data = await whakataukiApi.fetchWhakatauki({
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
  }, [])

  // -----------------------------
  // SAVE
  // -----------------------------
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
      setRows(await whakataukiApi.fetchWhakatauki())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  async function handleDelete() {
    try {
      await whakataukiApi.deleteWhakatauki(deleteId)
      showToast("Whakataukī deleted")
      setDeleteId(null)
      setRows(await whakataukiApi.fetchWhakatauki())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Whakataukī</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Whakataukī
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "text", label: "Whakataukī" },
          { key: "translation", label: "Translation" },
          { key: "theme", label: "Theme" },
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
          { name: "text", label: "Whakataukī", type: "textarea" },
          {
            name: "translation",
            label: "Translation",
            type: "textarea",
          },
          { name: "theme", label: "Theme (optional)" },
          { name: "source", label: "Source (optional)" },
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
