import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchConditions,
  createCondition,
  updateCondition,
  deleteCondition,
  fetchLearningResources,
  restoreCondition,
} from "../api/content.api"

export default function ConditionsPage() {
  const [rows, setRows] = useState([])
  const [resources, setResources] = useState([])
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

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [conditionsData, resourcesData] = await Promise.all([
        fetchConditions(showArchived).catch(() => []),
        fetchLearningResources(showArchived).catch(() => []),
      ])
      setRows(conditionsData || [])
      setResources(resourcesData || [])
    } catch (err) {
      setError("Failed to load conditions or learning resources.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [showArchived])

  async function reload() {
    const data = await fetchConditions(showArchived)
    setRows(data || [])
  }

  async function handleSave(formData) {
    try {
      const payload = {
        ...formData,
        sort_order: Number(formData.sort_order) || 0,
      }

      if (editing) {
        await updateCondition(editing.id, payload)
      } else {
        await createCondition(payload)
      }

      setEditing(null)
      setModalOpen(false)
      reload()
    } catch (err) {
      alert("Failed to save condition: " + err.message)
    }
  }

  async function handleDelete() {
    try {
      await deleteCondition(deleteId)
      setDeleteId(null)
      reload()
    } catch (err) {
      alert("Failed to delete condition: " + err.message)
    }
  }

  async function handleRestore(row) {
    try {
      await restoreCondition(row.id)
      reload()
    } catch (err) {
      alert("Failed to restore condition: " + err.message)
    }
  }

  async function handleStatusToggle(row, newStatus) {
    try {
      await updateCondition(row.id, {
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
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} conditions?`)) return
    setBulkActionLoading(true)
    try {
      await Promise.all(selectedIds.map((id) => deleteCondition(id)))
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
          return updateCondition(id, { ...item, status: newStatus })
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

  // --- Search Filtering ---
  const filteredRows = rows.filter((row) => {
    return (
      row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Map rows to include matching resources indicator
  const mappedRows = filteredRows.map((row) => {
    const linked = resources.filter(
      (res) =>
        res.title?.toLowerCase().includes(row.title?.toLowerCase()) ||
        res.description?.toLowerCase().includes(row.title?.toLowerCase())
    )
    return {
      ...row,
      linkedCount:
        linked.length > 0 ? (
          <span className="badge badge-accent badge-sm font-semibold text-white">
            {linked.length} linked
          </span>
        ) : (
          "—"
        ),
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conditions</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage medical conditions, descriptions, common triggers, and treatments.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Condition
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

      {/* Search Input */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="form-control flex-grow">
          <input
            type="text"
            placeholder="Search by title or summary..."
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

      {/* Table */}
      <CrudTable
        rows={mappedRows}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={showArchived ? null : setSelectedIds}
        onStatusToggle={showArchived ? null : handleStatusToggle}
        emptyMessage={
          showArchived 
            ? "No archived conditions found."
            : "No active conditions yet. Click + Add Condition to create one."
        }
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          { key: "triggers", label: "Triggers" },
          { key: "treatments", label: "Treatments" },
          { key: "linkedCount", label: "Resources" },
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

      {/* Edit/Create Modal */}
      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { 
            name: "title", 
            label: "Title",
            required: true,
            helpText: "Enter the condition name clearly (e.g. Asthma, Eczema).",
            validationMessage: "Please enter a title for the condition."
          },
          { 
            name: "summary", 
            label: "Summary", 
            type: "textarea",
            required: true,
            helpText: "Provide a simple plain-English summary of what this condition is.",
            validationMessage: "Please enter a summary of the condition."
          },
          { 
            name: "triggers", 
            label: "Triggers", 
            type: "textarea",
            helpText: "Detail common triggers that cause flare-ups of this condition (comma-separated)."
          },
          { 
            name: "treatments", 
            label: "Treatments", 
            type: "textarea",
            helpText: "Detail common medical or therapeutic treatments or lifestyle care."
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
            helpText: "Published conditions are live in the app. Drafts are only visible here.",
          },
          { 
            name: "sort_order", 
            label: "Sort Order Priority",
            helpText: "Lower numbers appear first in list sorting."
          },
        ]}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setModalOpen(false)
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
