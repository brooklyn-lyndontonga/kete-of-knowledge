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
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])

  // Selection & Bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [bulkCategory, setBulkCategory] = useState("")

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const data = await fetchLearningResources()
      setRows(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function reload() {
    const data = await fetchLearningResources()
    setRows(data || [])
  }

  function toggleCategory(key) {
    setSelectedCategories((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    )
  }

  async function handleSave(form) {
    try {
      const payload = {
        ...form,
        sort_order: Number(form.sort_order) || 0,
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
    } catch (err) {
      alert("Error saving resource: " + err.message)
    }
  }

  async function handleDelete() {
    try {
      await deleteLearningResource(deleteId)
      setDeleteId(null)
      reload()
    } catch (err) {
      alert("Error deleting resource: " + err.message)
    }
  }

  async function handleStatusToggle(row, newStatus) {
    try {
      await updateLearningResource(row.id, {
        ...row,
        status: newStatus,
      })
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      )
    } catch (err) {
      alert("Failed to toggle status: " + err.message)
    }
  }

  // --- Bulk Action Handlers ---
  async function handleBulkDelete() {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} resources?`)) return
    setBulkActionLoading(true)
    try {
      await Promise.all(selectedIds.map((id) => deleteLearningResource(id)))
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to delete some items: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  async function handleBulkStatusChange(newStatus) {
    setBulkActionLoading(true)
    try {
      await Promise.all(
        selectedIds.map((id) => {
          const item = rows.find((r) => r.id === id)
          return updateLearningResource(id, { ...item, status: newStatus })
        })
      )
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to update status for some items: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  async function handleBulkCategoryApply(e) {
    e.preventDefault()
    if (!bulkCategory) return
    setBulkActionLoading(true)
    try {
      await Promise.all(
        selectedIds.map((id) => {
          const item = rows.find((r) => r.id === id)
          // Add category if not already present
          const currentCats = item.categories || []
          const updatedCats = currentCats.includes(bulkCategory)
            ? currentCats
            : [...currentCats, bulkCategory]
          return updateLearningResource(id, { ...item, categories: updatedCats })
        })
      )
      setBulkCategory("")
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to assign category: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  // --- Filters ---
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !typeFilter || row.type === typeFilter
    const matchesCategory = !categoryFilter || row.categories?.includes(categoryFilter)
    return matchesSearch && matchesType && matchesCategory
  })

  // Map rows to include JSX for preview links
  const mappedRows = filteredRows.map((row) => ({
    ...row,
    categoriesText: row.categories && row.categories.length > 0 ? row.categories.join(", ") : "—",
    fileLink: row.file_path ? (
      <a
        href={row.file_path}
        target="_blank"
        rel="noopener noreferrer"
        className="link link-primary font-medium text-xs break-all"
        onClick={(e) => e.stopPropagation()} // prevent row click triggers
      >
        Open link ↗
      </a>
    ) : (
      "—"
    ),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage links, PDFs, videos, categories, and priority display orders.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setSelectedCategories([])
            setOpen(true)
          }}
        >
          + Add Resource
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="form-control flex-grow">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="input input-bordered rounded-xl w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="form-control min-w-[150px]">
          <select
            className="select select-bordered rounded-xl w-full"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="link">Link / URL</option>
            <option value="pdf">PDF File</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-control min-w-[150px]">
          <select
            className="select select-bordered rounded-xl w-full"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-primary/10 border border-primary/20 p-4 rounded-xl animate-fade-in">
          <div className="text-sm font-semibold text-primary">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="btn btn-xs btn-success text-white"
              onClick={() => handleBulkStatusChange("published")}
              disabled={bulkActionLoading}
            >
              Bulk Publish
            </button>
            <button
              className="btn btn-xs btn-warning text-white"
              onClick={() => handleBulkStatusChange("draft")}
              disabled={bulkActionLoading}
            >
              Bulk Draft
            </button>

            {/* Bulk Category Form */}
            <form onSubmit={handleBulkCategoryApply} className="flex gap-1 items-center">
              <select
                className="select select-xs select-bordered rounded-lg"
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
              >
                <option value="">Add category...</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn btn-xs btn-outline btn-neutral"
                disabled={bulkActionLoading || !bulkCategory}
              >
                Assign
              </button>
            </form>

            <button
              className="btn btn-xs btn-error btn-outline"
              onClick={handleBulkDelete}
              disabled={bulkActionLoading}
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <CrudTable
        rows={mappedRows}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onStatusToggle={handleStatusToggle}
        columns={[
          { key: "title", label: "Title" },
          { key: "categoriesText", label: "Categories" },
          { key: "type", label: "Type" },
          { key: "fileLink", label: "Link/Preview" },
          { key: "status", label: "Status" },
          { key: "sort_order", label: "Sort Order" },
        ]}
        onEdit={(r) => {
          setEditing(r)
          setSelectedCategories(r.categories || [])
          setOpen(true)
        }}
        onDelete={(r) => setDeleteId(r.id)}
      />

      {/* Edit/Create Modal */}
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
              { label: "Link / URL", value: "link" },
              { label: "PDF File", value: "pdf" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Audio", value: "audio" },
              { label: "Other", value: "other" },
            ],
          },
          { name: "file_path", label: "File Path / URL Link" },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ],
          },
          { name: "sort_order", label: "Sort Order Priority" },
        ]}
      >
        {/* Categories Checklist */}
        <div className="form-control w-full mt-2 col-span-full">
          <label className="label">
            <span className="label-text font-semibold">Assign Categories</span>
          </label>
          <div className="flex gap-4 p-2 bg-base-200/50 rounded-xl border border-base-200">
            {CATEGORY_OPTIONS.map((c) => (
              <label key={c.key} className="label cursor-pointer flex gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                  checked={selectedCategories.includes(c.key)}
                  onChange={() => toggleCategory(c.key)}
                />
                <span className="label-text text-sm">{c.label}</span>
              </label>
            ))}
          </div>
          <span className="label-text-alt opacity-50 mt-1 pl-1">
            Resources can be assigned to multiple categories.
          </span>
        </div>
      </CrudModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
