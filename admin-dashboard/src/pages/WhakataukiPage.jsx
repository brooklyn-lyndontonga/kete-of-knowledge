/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorState from "../components/ui/ErrorState"
import { useToast } from "../components/ui/ToastProvider"

export default function WhakataukiPage() {
  const toast = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    text: "",
    translation: "",
  })

  // ------------------------------------------------
  // FETCH DATA
  // ------------------------------------------------
  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/whakatauki")
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError("Failed to load whakataukī.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // ------------------------------------------------
  // SAVE (CREATE/UPDATE)
  // ------------------------------------------------
  async function save() {
    try {
      const method = editing ? "PUT" : "POST"
      const url = editing
        ? `/api/whakatauki/${editing.id}`
        : "/api/whakatauki"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      toast.showToast("Saved successfully")
      setModalOpen(false)
      load()
    } catch (err) {
      toast.showToast("Error saving", "error")
    }
  }

  // ------------------------------------------------
  // DELETE
  // ------------------------------------------------
  async function deleteItem() {
    try {
      await fetch(`/api/whakatauki/${editing.id}`, { method: "DELETE" })
      toast.showToast("Deleted")
      setDeleteOpen(false)
      load()
    } catch (err) {
      toast.showToast("Error deleting", "error")
    }
  }

  // ------------------------------------------------
  // TABLE COLUMNS
  // ------------------------------------------------
  const columns = [
    { key: "text", label: "Whakataukī" },
    {
      key: "translation",
      label: "Translation",
      render: (val) => (val ? val.slice(0, 50) + "…" : ""),
    },
  ]

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Whakataukī</h1>

        <button
          onClick={() => {
            setEditing(null)
            setForm({ text: "", translation: "" })
            setModalOpen(true)
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Whakataukī
        </button>
      </div>

      <CrudTable
        columns={columns}
        data={data}
        onEdit={(item) => {
          setEditing(item)
          setForm(item)
          setModalOpen(true)
        }}
        onDelete={(item) => {
          setEditing(item)
          setDeleteOpen(true)
        }}
      />

      {/* Modal: Create/Edit */}
      <CrudModal
        open={modalOpen}
        title={editing ? "Edit Whakataukī" : "Add Whakataukī"}
        onClose={() => setModalOpen(false)}
        onSubmit={save}
      >
        <div className="grid gap-3">
          <textarea
            className="input h-24"
            placeholder="Whakataukī text"
            value={form.text}
            onChange={(e) =>
              setForm({ ...form, text: e.target.value })
            }
          />

          <textarea
            className="input h-24"
            placeholder="Translation (optional)"
            value={form.translation}
            onChange={(e) =>
              setForm({ ...form, translation: e.target.value })
            }
          />
        </div>
      </CrudModal>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        open={deleteOpen}
        title={`Delete this whakataukī?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={deleteItem}
      />
    </div>
  )
}
