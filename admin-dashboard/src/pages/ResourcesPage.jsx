/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorState from "../components/ui/ErrorState"
import { useToast } from "../components/ui/ToastProvider"

export default function LibraryPage() {
  const toast = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: "",
    category_id: "",
    content: "",
    image_url: "",
  })

  // -----------------------------------------
  // FETCH RESOURCES
  // -----------------------------------------
  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/library")
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError("Failed to load resources.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // -----------------------------------------
  // HANDLE SAVE (Create + Update)
  // -----------------------------------------
  async function save() {
    try {
      const method = editing ? "PUT" : "POST"
      const url = editing
        ? `/api/library/${editing.id}`
        : "/api/library"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      toast.showToast("Saved successfully")
      setModalOpen(false)
      load()
    } catch (err) {
      toast.showToast("Error saving resource", "error")
    }
  }

  // -----------------------------------------
  // DELETE
  // -----------------------------------------
  async function deleteItem() {
    try {
      await fetch(`/api/library/${editing.id}`, { method: "DELETE" })

      toast.showToast("Deleted")
      setDeleteOpen(false)
      load()
    } catch (err) {
      toast.showToast("Error deleting", "error")
    }
  }

  // -----------------------------------------
  // TABLE COLUMNS
  // -----------------------------------------
  const columns = [
    { key: "title", label: "Title" },
    { key: "category_id", label: "Category" },
    {
      key: "content",
      label: "Content",
      render: (val) => val?.slice(0, 50) + "…",
    },
  ]

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Library Resources</h1>

        <button
          onClick={() => {
            setEditing(null)
            setForm({
              title: "",
              category_id: "",
              content: "",
              image_url: "",
            })
            setModalOpen(true)
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Resource
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

      {/* Create/Edit Modal */}
      <CrudModal
        open={modalOpen}
        title={editing ? "Edit Resource" : "Add Resource"}
        onClose={() => setModalOpen(false)}
        onSubmit={save}
      >
        <div className="grid gap-3">
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="input"
            placeholder="Category ID"
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          />

          <textarea
            className="input h-32"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
      </CrudModal>

      {/* Delete modal */}
      <DeleteConfirmModal
        open={deleteOpen}
        title={`Delete "${editing?.title}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={deleteItem}
      />
    </div>
  )
}
