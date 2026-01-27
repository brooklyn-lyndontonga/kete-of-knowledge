import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
} from "../api/content.api"

export default function WhakataukiPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // 1️⃣ Load existing content
  useEffect(() => {
    fetchWhakatauki()
      .then(setRows)
      .finally(() => setLoading(false))
  }, [])

  async function reload() {
    setRows(await fetchWhakatauki())
  }

  // 2️⃣ Create or update
  async function handleSave(data) {
    if (editing) {
      await updateWhakatauki(editing.id, data)
    } else {
      await createWhakatauki(data)
    }

    setEditing(null)
    setModalOpen(false)
    reload()
  }

  // 3️⃣ Delete
  async function handleDelete() {
    await deleteWhakatauki(deleteId)
    setDeleteId(null)
    reload()
  }

  return (
    <>
      <div className="flex justify-between mb-4">
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

      <CrudTable
        rows={rows}
        loading={loading}
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
          { name: "translation", label: "Translation", type: "textarea" },
          { name: "theme", label: "Theme" },
        ]}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  )
}
