import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
  restoreLearningResource,
  uploadMediaFile,
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
  const [showArchived, setShowArchived] = useState(false)

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
  }, [showArchived])

  async function loadData() {
    setLoading(true)
    try {
      const data = await fetchLearningResources(showArchived)
      setRows(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function reload() {
    const data = await fetchLearningResources(showArchived)
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
    if (!form.file_path && !form.file_upload) {
      alert("Please either paste a URL link or select a local file to upload.")
      return
    }

    setLoading(true)
    try {
      let finalFilePath = form.file_path || ""

      if (form.file_upload) {
        const uploadRes = await uploadMediaFile(form.file_upload)
        if (uploadRes && uploadRes.fileUrl) {
          finalFilePath = uploadRes.fileUrl
        } else {
          throw new Error("Failed to upload local file.")
        }
      }

      const payload = {
        title: form.title,
        description: form.description,
        type: form.type,
        file_path: finalFilePath,
        status: form.status || "draft",
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
    } finally {
      setLoading(false)
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

  async function handleRestore(row) {
    try {
      await restoreLearningResource(row.id)
      reload()
    } catch (err) {
      alert("Error restoring resource: " + err.message)
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

      {/* Tabs for Active vs Archived */}
      <div className="tabs tabs-boxed mb-4 max-w-xs">
        <button
          className={`tab ${!showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(false)}
        >
          Active Content
        </button>
        <button
          className={`tab ${showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(true)}
        >
          Archived Content ({rows.length})
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
      {selectedIds.length > 0 && !showArchived && (
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
        onSelectionChange={showArchived ? null : setSelectedIds}
        onStatusToggle={showArchived ? null : handleStatusToggle}
        emptyMessage={
          showArchived 
            ? "No archived resources found."
            : "No active resources yet. Click + Add Resource to create one."
        }
        columns={[
          { key: "title", label: "Title" },
          { key: "categoriesText", label: "Categories" },
          { key: "type", label: "Type" },
          { key: "fileLink", label: "Link/Preview" },
          { key: "status", label: "Status" },
          { key: "sort_order", label: "Sort Order" },
        ]}
        onEdit={
          showArchived
            ? null
            : (r) => {
                setEditing(r)
                setSelectedCategories(r.categories || [])
                setOpen(true)
              }
        }
        onDelete={showArchived ? null : (r) => setDeleteId(r.id)}
        onRestore={showArchived ? handleRestore : null}
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
          { 
            name: "title", 
            label: "Title",
            required: true,
            helpText: "Enter the name of the learning resource. Keep it clear.",
            validationMessage: "Please enter a title for the resource."
          },
          { 
            name: "description", 
            label: "Description", 
            type: "textarea",
            required: true,
            helpText: "Provide a brief description of what the resource contains.",
            validationMessage: "Please enter a description of the resource."
          },
          {
            name: "type",
            label: "Type",
            type: "select",
            required: true,
            options: [
              { label: "Link / URL", value: "link" },
              { label: "PDF File", value: "pdf" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Audio", value: "audio" },
              { label: "Other", value: "other" },
            ],
            helpText: "Categorize the resource format (e.g. video link, PDF file).",
            validationMessage: "Please select a resource type."
          },
          { 
            name: "file_path", 
            label: "File Path / URL Link",
            required: false,
            helpText: "Paste the web link or file path of the resource (or upload a local file below)."
          },
          {
            name: "file_upload",
            label: "Or Upload a Local File",
            type: "file",
            required: false,
            helpText: "Choose a PDF, image, audio, or video file to upload directly."
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ],
            helpText: "Draft resources are only shown here. Published resources are visible in the app.",
          },
          { 
            name: "sort_order", 
            label: "Sort Order Priority",
            helpText: "Set lower numbers (like 1 or 2) to display this resource first in the list."
          },
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
