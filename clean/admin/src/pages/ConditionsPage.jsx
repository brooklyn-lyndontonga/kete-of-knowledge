import { useEffect, useState } from "react"
import CrudTable from "../ui/CrudTable.jsx"
import CrudModal from "../ui/CrudModal.jsx"
import DeleteConfirmModal from "../ui/DeleteConfirmModal.jsx"

import {
  fetchConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} from "../api/content.api"

function showToast(message, type = "info") {
  console.log(`[${type}]`, message)
}

export default function ConditionsPage() {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchConditions().then(setRows)
  }, [])

  async function reload() {
    setRows(await fetchConditions())
  }

  async function handleSave(data) {
    if (editing) {
      await updateCondition(editing.id, data)
      showToast("Condition updated")
    } else {
      await createCondition(data)
      showToast("Condition created")
    }
    setEditing(null)
    setModalOpen(false)
    reload()
  }

  async function handleDelete() {
    await deleteCondition(deleteId)
    setDeleteId(null)
    reload()
    showToast("Condition deleted")
  }

  return (
    <>
      <h1>Conditions</h1>

      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        + Add Condition
      </button>

      <CrudTable
        rows={rows}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
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
          { name: "title", label: "Title" },
          { name: "summary", label: "Summary", type: "textarea" },
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
