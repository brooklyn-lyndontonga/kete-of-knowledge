 
import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../api/content.api"

const CATEGORY_OPTIONS = [
  { key: "learn", label: "Learn" },
  { key: "practice", label: "Practice" },
  { key: "support", label: "Support" },
]

export default function LearningResourcesPage() {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    fetchLearningResources().then(setRows)
  }, [])

  async function reload() {
    setRows(await fetchLearningResources())
  }

  function toggleCategory(key) {
    setSelectedCategories((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    )
  }

  async function handleSave(form) {
    const payload = {
      ...form,
      categories: selectedCategories,
    }

    if (editing) {
      await updateLearningResource(editing.id, payload)
    } else {
      await createLearningResource(payload)
    }

    setEditing(null)
    setSelectedCategories([])
    setOpen(false)
    reload()
  }

  async function handleDelete() {
    await deleteLearningResource(deleteId)
    setDeleteId(null)
    reload()
  }

  return (
    <>
      <h1>Learning Resources</h1>

      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        + Add Resource
      </button>

      <CrudTable
        rows={rows}
        columns={[
          { key: "title", label: "Title" },
          {
            key: "categories",
            label: "Categories",
            render: (v) => v.join(", "),
          },
          { key: "type", label: "Type" },
        ]}
        onEdit={(r) => {
          setEditing(r)
          setSelectedCategories(r.categories || [])
          setOpen(true)
        }}
        onDelete={(r) => setDeleteId(r.id)}
      />

      <CrudModal
        open={open}
        initial={editing}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setSelectedCategories([])
          setOpen(false)
        }}
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "PDF", value: "pdf" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Audio", value: "audio" },
              { label: "Other", value: "other" },
            ],
          },
        ]}
      >
        {/* Categories UI injected into modal */}
        <div className="form-field form-field--full">
          <label>Categories</label>

          {CATEGORY_OPTIONS.map((c) => (
            <label key={c.key} style={{ display: "flex", gap: 8 }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.key)}
                onChange={() => toggleCategory(c.key)}
              />
              {c.label}
            </label>
          ))}

          <small className="text-muted">
            Resources can appear in more than one section.
          </small>
        </div>
      </CrudModal>

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  )
}
