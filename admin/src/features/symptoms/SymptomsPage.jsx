import { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as symptomsApi from "./symptoms.api"

export default function SymptomsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setRows(await symptomsApi.fetchSymptoms())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await symptomsApi.updateSymptom(editing.id, formData)
        showToast("Symptom updated")
      } else {
        await symptomsApi.createSymptom(formData)
        showToast("Symptom created")
      }

      setEditing(null)
      setModalOpen(false)
      setRows(await symptomsApi.fetchSymptoms())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await symptomsApi.deleteSymptom(deleteId)
      showToast("Symptom deleted")
      setDeleteId(null)
      setRows(await symptomsApi.fetchSymptoms())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Symptoms</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Symptom
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "severity", label: "Severity" },
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
          { name: "severity", label: "Severity" },
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
