import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchReflectionTemplates,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
  restoreReflectionTemplate,
} from "../api/content.api"

export default function ReflectionTemplatesPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showArchived, setShowArchived] = useState(false)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // Selection & Bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkActionLoading, setBulkActionLoading] = useState(false)

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("")

  const [activeCount, setActiveCount] = useState(0)
  const [archivedCount, setArchivedCount] = useState(0)

  async function load() {
    try {
      setLoading(true)
      const [activeData, archivedData] = await Promise.all([
        fetchReflectionTemplates(false),
        fetchReflectionTemplates(true),
      ])
      setActiveCount(activeData?.length || 0)
      setArchivedCount(archivedData?.length || 0)
      setRows(showArchived ? (archivedData || []) : (activeData || []))
    } catch (err) {
      setError("Failed to load reflection templates")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [showArchived])

  async function reload() {
    const [activeData, archivedData] = await Promise.all([
      fetchReflectionTemplates(false),
      fetchReflectionTemplates(true),
    ])
    setActiveCount(activeData?.length || 0)
    setArchivedCount(archivedData?.length || 0)
    setRows(showArchived ? (archivedData || []) : (activeData || []))
  }

  async function handleSave(formData) {
    try {
      const payload = {
        ...formData,
        sort_order: Number(formData.sort_order) || 0,
      }

      if (editing) {
        await updateReflectionTemplate(editing.id, payload)
      } else {
        await createReflectionTemplate(payload)
      }

      setEditing(null)
      setModalOpen(false)
      load()
    } catch (err) {
      alert("Failed to save reflection template: " + err.message)
    }
  }

  async function handleDelete() {
    try {
      await deleteReflectionTemplate(deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      alert("Failed to delete reflection template: " + err.message)
    }
  }

  async function handleRestore(row) {
    try {
      await restoreReflectionTemplate(row.id)
      load()
    } catch (err) {
      alert("Failed to restore reflection template: " + err.message)
    }
  }

  async function handleStatusToggle(row, newStatus) {
    try {
      await updateReflectionTemplate(row.id, {
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

  // --- Bulk Actions ---
  async function handleBulkDelete() {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} templates?`)) return
    setBulkActionLoading(true)
    try {
      await Promise.all(selectedIds.map((id) => deleteReflectionTemplate(id)))
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
          return updateReflectionTemplate(id, { ...item, status: newStatus })
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

  // --- Filter ---
  const filteredRows = rows.filter((row) => {
    return (
      row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.prompt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reflection Templates</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage templates and journaling prompts for daily reflection screens.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Template
        </button>
      </div>

      {/* Tabs for Active vs Archived */}
      <div className="tabs tabs-boxed mb-4 max-w-xs">
        <button
          className={`tab ${!showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(false)}
        >
          Active Content ({activeCount})
        </button>
        <button
          className={`tab ${showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(true)}
        >
          Archived Content ({archivedCount})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="form-control flex-grow">
          <input
            type="text"
            placeholder="Search by category, title or prompt..."
            className="input input-bordered rounded-xl w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      {error && <p className="text-error font-medium">{error}</p>}

      <CrudTable
        rows={filteredRows}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={showArchived ? null : setSelectedIds}
        onStatusToggle={showArchived ? null : handleStatusToggle}
        emptyMessage={
          showArchived 
            ? "No archived reflection templates found."
            : "No active reflection templates yet. Click + Add Template to create one."
        }
        columns={[
          { key: "category", label: "Category" },
          { key: "title", label: "Title" },
          { key: "prompt", label: "Prompt" },
          { key: "status", label: "Status" },
          { key: "sort_order", label: "Sort Order" },
        ]}
        onEdit={
          showArchived
            ? null
            : (row) => {
                setEditing(row)
                setModalOpen(true)
              }
        }
        onDelete={showArchived ? null : (row) => setDeleteId(row.id)}
        onRestore={showArchived ? handleRestore : null}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { 
            name: "category", 
            label: "Category",
            required: true,
            helpText: "Define a category to group this reflection (e.g. Health, Mood, Whānau).",
            validationMessage: "Please enter a category."
          },
          { 
            name: "title", 
            label: "Title",
            required: true,
            helpText: "A short, descriptive title for this daily prompt.",
            validationMessage: "Please enter a title."
          },
          {
            name: "prompt",
            label: "Prompt",
            type: "textarea",
            required: true,
            helpText: "The actual guiding question or sentence starter shown to the user.",
            validationMessage: "Please enter the reflection prompt text."
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ],
            helpText: "Draft templates won't appear as prompts in the app.",
          },
          { 
            name: "sort_order", 
            label: "Sort Order Priority",
            helpText: "Used to determine display sequence if multiple templates are active."
          },
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
    </div>
  )
}
