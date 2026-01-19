import { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as categoriesApi from "./resourceCategories.api"

export default function ResourceCategoriesPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        const data = await categoriesApi.fetchResourceCategories({
          signal: controller.signal,
        })
        setRows(data)
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [showToast])

  async function handleSave(formData) {
    try {
      if (editing) {
        await categoriesApi.updateResourceCategory(editing.id, formData)
        showToast("Category updated")
      } else {
        await categoriesApi.createResourceCategory(formData)
        showToast("Category created")
      }

      setEditing(null)
      setModalOpen(false)
      const refreshed = await categoriesApi.fetchResourceCategories()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await categoriesApi.deleteResourceCategory(deleteId)
      showToast("Category deleted")
      setDeleteId(null)
      const refreshed = await categoriesApi.fetchResourceCategories()
      setRows(refreshed)
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Resource Categories</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Category
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "image", label: "Image" },
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
          { name: "slug", label: "Slug" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image Path" },
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
